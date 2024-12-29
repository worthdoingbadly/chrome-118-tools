// Stub functions that will be overwritten with native code.

export function read32(addr: u32) : u32 {
  let a = 0x41414141_41414141;
  let b = 0x41414141_41414142;
  let c = 0x41414141_41414143;
  let d = 0x41414141_41414144;
  return 0;
}

export function write32(addr: u32, value: u32): void {
  let a = 0x41414141_41414141;
  let b = 0x41414141_41414142;
  let c = 0x41414141_41414143;
  let d = 0x41414141_41414144;
}

export function read8(addr: u32) : u8 {
  let a = 0x41414141_41414141;
  let b = 0x41414141_41414142;
  let c = 0x41414141_41414143;
  let d = 0x41414141_41414144;
  return 0;
}

export function write8(addr: u32, value: u8): void {
  let a = 0x41414141_41414141;
  let b = 0x41414141_41414142;
  let c = 0x41414141_41414143;
  let d = 0x41414141_41414144;
}

export function syscall(arg0: u32): u32 {
  let a = 0x41414141_41414141;
  let b = 0x41414141_41414142;
  let c = 0x41414141_41414143;
  let d = 0x41414141_41414144;
  return 0;
}

export function getLR() : u32 {
  let a = 0x41414141_41414141;
  let b = 0x41414141_41414142;
  let c = 0x41414141_41414143;
  let d = 0x41414141_41414144;
  return 0;
}
