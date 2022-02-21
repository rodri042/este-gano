#!/bin/bash

. ./scripts/try.sh

./node_modules/.bin/webpack --output-library-target window \
                            --output-library encoder \
														--mode=production \
                            src/encoder.js \
                            -o extension/bundle.js
