const MARKER = "\u2062"; // INVISIBLE TIMES
const SEPARATOR = "\u2060"; // WORD JOINER
const ZERO = "\u200b"; // ZERO WIDTH SPACE
const ONE = "\u200c"; // ZERO WIDTH NON-JOINER
const ENCODED_FORMAT = /\u2062([^\u2062]*)\u2062/g;
const DECODED_FORMAT = /!\[([^\]\u2062\u2060\u200b\u200c]*)\]/g;

export default {
	encode(message) {
		return message.replace(
			DECODED_FORMAT,
			(__, secret) => `${MARKER}${this._toInvisible(secret)}${MARKER}`
		);
	},

	decode(message) {
		return message.replace(
			ENCODED_FORMAT,
			(__, secret) => `![${this._toVisible(secret)}]`
		);
	},

	_toInvisible(string) {
		return [...string]
			.flatMap((character) => {
				const codePoint = character.codePointAt(0);
				const bits = codePoint.toString(2).split("");

				return [...bits.map((it) => (it === "1" ? ONE : ZERO)), SEPARATOR];
			})
			.join("");
	},

	_toVisible(string) {
		return string
			.split(SEPARATOR)
			.map((character) => {
				const bits = [...character].map((it) => (it === ONE ? "1" : "0"));
				const codePoint = parseInt(bits.join(""), 2);
				if (isNaN(codePoint)) return "";

				return String.fromCodePoint(codePoint);
			})
			.join("");
	}
};
