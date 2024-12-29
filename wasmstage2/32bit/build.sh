#!/bin/sh
set -e
npx asc wasmstage2.ts --outFile wasmstage2.wasm
clang -target arm-linux-gnueabihf -Os -c wasmstage2-native.c
objdump -d wasmstage2-native.o > wasmstage2-native.txt
echo "export const wasmstage2Native = [" >wasmstage2-native.mjs
python3 dump-disasm.py wasmstage2-native.txt >>wasmstage2-native.mjs
echo "];" >>wasmstage2-native.mjs
