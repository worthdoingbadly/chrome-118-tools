// Stub functions that will be overwritten with native code.

export function read64(addr: u64) : u64 {
  let a = 0x41414141_41414141;
  let b = 0x41414141_41414142;
  let c = 0x41414141_41414143;
  let d = 0x41414141_41414144;
  return 0;
}

export function write64(addr: u64, value: u64): void {
  let a = 0x41414141_41414141;
  let b = 0x41414141_41414142;
  let c = 0x41414141_41414143;
  let d = 0x41414141_41414144;
}

export function read32(addr: u64) : u32 {
  let a = 0x41414141_41414141;
  let b = 0x41414141_41414142;
  let c = 0x41414141_41414143;
  let d = 0x41414141_41414144;
  return 0;
}

export function write32(addr: u64, value: u32): void {
  let a = 0x41414141_41414141;
  let b = 0x41414141_41414142;
  let c = 0x41414141_41414143;
  let d = 0x41414141_41414144;
}

export function read8(addr: u64) : u8 {
  let a = 0x41414141_41414141;
  let b = 0x41414141_41414142;
  let c = 0x41414141_41414143;
  let d = 0x41414141_41414144;
  return 0;
}

export function write8(addr: u64, value: u8): void {
  let a = 0x41414141_41414141;
  let b = 0x41414141_41414142;
  let c = 0x41414141_41414143;
  let d = 0x41414141_41414144;
}

export function call64(arg0: u64, arg1: u64, arg2: u64, arg3: u64, arg4: u64, addr: u64): u64 {
  let a = 0x41414141_41414141;
  let b = 0x41414141_41414142;
  let c = 0x41414141_41414143;
  let d = 0x41414141_41414144;
  return 0;
}

export function memcpy(dest: u64, src: u64, n: u64): void {
  let a = 0x41414141_41414141;
  let b = 0x41414141_41414142;
  let c = 0x41414141_41414143;
  let d = 0x41414141_41414144;
}

export function cacheflush(addr: u64, length: u64): void {
  let a = 0x41414141_41414141;
  let b = 0x41414141_41414142;
  let c = 0x41414141_41414143;
  let d = 0x41414141_41414144;
}

export function icacheflush(addr: u64, length: u64): void {
  let a = 0x41414141_41414141;
  let b = 0x41414141_41414142;
  let c = 0x41414141_41414143;
  let d = 0x41414141_41414144;
}

export function syscall(arg0: u64, arg1: u64, arg2: u64, arg3: u64, arg4: u64, callnum: u64): u64 {
  let a = 0x41414141_41414141;
  let b = 0x41414141_41414142;
  let c = 0x41414141_41414143;
  let d = 0x41414141_41414144;
  return 0;
}

export function getLR() : u64 {
  let a = 0x41414141_41414141;
  let b = 0x41414141_41414142;
  let c = 0x41414141_41414143;
  let d = 0x41414141_41414144;
  return 0;
}
