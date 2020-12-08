#!/usr/bin/env bash
set -e

filename=${1%%.*}
node_modules/.bin/tsc -t es2020 -m esnext $1
mv $filename.js $filename.out.js
node $filename.out.js $2
