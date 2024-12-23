const peekpoke = require('./build/Release/peekpoke.node');
console.log(peekpoke.addrof("1234").toString(16));
console.log(peekpoke.addrof(1234).toString(16));
console.log(peekpoke.write32(0x1234n, 0x5678));
