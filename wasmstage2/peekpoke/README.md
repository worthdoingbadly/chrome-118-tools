Node:
`npx node-gyp build`

Electron:
https://www.electronjs.org/docs/latest/tutorial/using-native-node-modules#manually-building-for-electron
`HOME=~/.electron-gyp npx node-gyp rebuild --target=27.2.0 --arch=arm64 --dist-url=https://electronjs.org/headers`

Test:
`ELECTRON_RUN_AS_NODE=1 lldb ../../electron-v27.2.0/electron -- peekpoke-tester.js`
