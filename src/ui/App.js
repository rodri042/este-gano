import React, { PureComponent } from "react";
import encoder from "../encoder";
import "./global.css";

export default class App extends PureComponent {
	state = { encodeInput: "", decodeInput: "" };

	render() {
		const { encodeInput, decodeInput } = this.state;
		const encodedOutput = this._encode(encodeInput);
		const decodedOutput = this._decode(decodeInput);

		return (
			<div>
				<h1>éste-ganó</h1>
				<h2>Encode secret messages by using ![this syntax]</h2>
				<h2>
					<a href="https://github.com/rodri042/éste-ganó">Fork me on GitHub!</a>
				</h2>
				<div>
					<h3>Encode:</h3>
					<textarea
						className="input"
						rows={1}
						cols={10}
						autoFocus
						onChange={(e) => {
							const text = e.target.value;
							this.setState({ encodeInput: text });
						}}
					/>
				</div>
				<pre className="output">{encodedOutput}</pre>

				<div>
					<h3>Decode:</h3>
					<textarea
						className="input"
						rows={1}
						cols={10}
						autoFocus
						onChange={(e) => {
							const text = e.target.value;
							this.setState({ decodeInput: text });
						}}
					/>
				</div>
				<pre className="output">{decodedOutput}</pre>
			</div>
		);
	}

	_encode(text) {
		return encoder.encode(text);
	}

	_decode(text) {
		return encoder.decode(text);
	}
}
