let isOn = false;
const updateStatus = (it) => {
	isOn = it;
	load();
};
const encoder = window.encoder.default;

chrome.runtime.sendMessage({ action: "request-status" }, updateStatus);
chrome.runtime.onMessage.addListener(updateStatus);

const CHARACTER = " ";

const load = () => {
	document.querySelectorAll("input, textarea").forEach((input) => {
		input.removeEventListener("keypress", inputListener);
		input.addEventListener("keypress", inputListener);
	});

	document.querySelectorAll("[contenteditable=true]").forEach((div) => {
		div.removeEventListener("keypress", editableListener);
		div.addEventListener("keypress", editableListener);
	});
};

const encode = (key, get, set) => {
	if (!isOn) return;

	if (key === CHARACTER) {
		const content = get();
		set(encoder.encode(content));
	}
};

const inputListener = (e) => {
	encode(
		e.key,
		() => e.target.value || "",
		(value) => {
			e.target.value = value;
		}
	);
};

const editableListener = (e) => {
	setTimeout(() => {
		encode(
			e.key,
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
