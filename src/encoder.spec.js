import encoder from "./encoder";
require("chai").Should();

describe("Encoder", () => {
	it("can encode secret messages as zero-width characters", () => {
		encoder
			.encode("Hello, ![I hate the ]world")
			.should.equal(
				"Hello, ⁢‌​​‌​​‌⁠‌​​​​​⁠‌‌​‌​​​⁠‌‌​​​​‌⁠‌‌‌​‌​​⁠‌‌​​‌​‌⁠‌​​​​​⁠‌‌‌​‌​​⁠‌‌​‌​​​⁠‌‌​​‌​‌⁠‌​​​​​⁠⁢world"
			);
	});

	it("can decode secret messages from zero-width characters", () => {
		encoder
			.decode(
				"Hello, ⁢‌​​‌​​‌⁠‌​​​​​⁠‌‌​‌​​​⁠‌‌​​​​‌⁠‌‌‌​‌​​⁠‌‌​​‌​‌⁠‌​​​​​⁠‌‌‌​‌​​⁠‌‌​‌​​​⁠‌‌​​‌​‌⁠‌​​​​​⁠⁢world"
			)
			.should.equal("Hello, ![I hate the ]world");
	});

	it("cannot encode reserved characters", () => {
		["\u2062", "\u2060", "\u200b", "\u200c"]
			.map((it) => `This ![contains an invalid character: ${it}], not encoded`)
			.forEach((message) => {
				encoder.encode(message).should.equal(message);
			});
	});
});
