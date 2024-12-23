const stage2ModuleBytes = readbuffer("wasmstage2.wasm");
const module = new WebAssembly.Module(stage2ModuleBytes);
const instance = new WebAssembly.Instance(module);
instance.exports.read64(0n);
%DebugPrint(instance);
%SystemBreak();
instance.exports.read64(0n);
