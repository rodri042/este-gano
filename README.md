# éste-ganó

[Steganography](https://en.wikipedia.org/wiki/Steganography) toy that encodes secret messages in strings by using zero-width Unicode characters.

See [encoder.spec.js](src/encoder.spec.js)

## Usage

### Web version

https://rodri042.github.io/este-gano/

### Chrome extension

- Download the extension from the [Releases](https://github.com/rodri042/jeringozo/releases) section
- Open any chat app
- Enable the extension by using the button
- Type `![this syntax]` to add secret messages
- When the extension is installed, you'll see secret messages highlighted in red

# Developing

## Install

```bash
nvm use
npm install
```

## Run the app

```bash
npm start
```

## Build site

```bash
npm run build
```

## Build extension

```bash
./scripts/build-extension.sh
```

## Deploy

```bash
./scripts/deploy.sh <GITHUB_TOKEN>
```
