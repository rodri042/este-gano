const { ENCODED_FORMAT, DECODED_FORMAT, default: encoder } = window.encoder;
const HIGHLIGHT_TEXT_COLOR = "#000000";
const HIGHLIGHT_BACK_COLOR = "#FF000088";

const observer = new MutationObserver(() => load());
observer.observe(document, { childList: true, subtree: true });

const load = () => {
	document.querySelectorAll("input, textarea").forEach((input) => {
		input.removeEventListener("keypress", inputListener);
		input.addEventListener("keypress", inputListener);
	});

	document.querySelectorAll("[contenteditable=true]").forEach((div) => {
		div.removeEventListener("keypress", editableListener);
		div.addEventListener("keypress", editableListener);
	});

	translateAllNodes();
};

const translateAllNodes = () => {
	[...document.querySelectorAll("span"), ...document.querySelectorAll("div")]
		.filter((node) => node.children.length === 0)
		.filter((node) => node.contentEditable !== "true")
		.filter((node) => ENCODED_FORMAT.test(node.innerHTML))
		.forEach((node) => {
			node.innerHTML = encoder
				.decode(node.innerHTML)
				.replace(
					DECODED_FORMAT,
					(__, secret) =>
						`<span style="color: ${HIGHLIGHT_TEXT_COLOR}; background-color: ${HIGHLIGHT_BACK_COLOR}">${secret}</span>`
				);
		});
};

const encode = (get, set) => {
	const content = get();

	if (DECODED_FORMAT.test(content)) set(encoder.encode(content));
};

const inputListener = (e) => {
	encode(
		() => e.target.value || "",
		(value) => {
			e.target.value = value;
		}
	);
};

const editableListener = (e) => {
	setTimeout(() => {
		encode(
			() => e.target.textContent || "",
			(value) => {
				e.target.textContent = value;
				setCaretPosition(e.target, value.length);
			}
		);
	});
};

function setCaretPosition(element, offset) {
	const range = document.createRange();
	const sel = window.getSelection();

	// select appropriate node
	let currentNode = null;
	let previousNode = null;

	for (let i = 0; i < element.childNodes.length; i++) {
		// save previous node
		previousNode = currentNode;

		// get current node
		currentNode = element.childNodes[i];
		// if we get span or something else then we should get child node
		while (currentNode.childNodes.length > 0) {
			currentNode = currentNode.childNodes[0];
		}

		// calc offset in current node
		if (previousNode != null) {
			offset -= previousNode.length;
		}
		// check whether current node has enough length
		if (offset <= currentNode.length) {
			break;
		}
	}
	// move caret to specified offset
	if (currentNode != null) {
		range.setStart(currentNode, offset);
		range.collapse(true);
		sel.removeAllRanges();
		sel.addRange(range);
	}
}
