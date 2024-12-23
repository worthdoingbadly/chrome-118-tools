#include <stdint.h>

// in v8 Wasm JIT, x7 is context, x1 is temp, x0, x2, x3, x4, x5, x6 are first 6 arguments
// see Builtins_JSToWasmWrapper
// https://source.chromium.org/chromium/chromium/src/+/main:v8/src/builtins/arm64/builtins-arm64.cc;l=4324;drc=760666838cbe612877c8cce18c38d95194f8a70e
// https://source.chromium.org/chromium/chromium/src/+/main:v8/src/wasm/wasm-linkage.h;l=59;drc=760666838cbe612877c8cce18c38d95194f8a70e
// TODO(zhuowei): load more args if we need them

uint64_t read64(uint64_t* addr) {
	return *addr;
}

void write64(uint64_t* addr, uint64_t unusedx1, uint64_t value) {
	*addr = value;
}

uint32_t read32(uint32_t* addr) {
	return *addr;
}

void write32(uint32_t* addr, uint64_t unusedx1, uint32_t value) {
	*addr = value;
}

uint8_t read8(uint8_t* addr) {
	return *addr;
}

void write8(uint8_t* addr, uint64_t unusedx1, uint8_t value) {
	*addr = value;
}

typedef uint64_t (call5args_function)(uint64_t arg0, uint64_t arg1, uint64_t arg2, uint64_t arg3, uint64_t arg4);

uint64_t call64(uint64_t arg0, uint64_t unusedx1, uint64_t arg1, uint64_t arg2, uint64_t arg3, uint64_t arg4, call5args_function* addr) {
	return addr(arg0, arg1, arg2, arg3, arg4);
}

void memcpy_(char* dst, uint64_t unusedx1, const char* src, uint64_t n) {
	for (uint64_t i = 0; i < n; i++) {
		dst[i] = src[i];
	}
}

void cacheflush(char* addr, uint64_t unusedx1, uint64_t length) {
	// TODO(zhuowei)
}

void icacheflush(char* addr, uint64_t unusedx1, uint64_t length) {
	// TODO(zhuowei)
}

uint64_t syscall(uint64_t arg0, uint64_t unusedx1, uint64_t arg1, uint64_t arg2, uint64_t arg3, uint64_t arg4, uint64_t callnum) {
	register uint64_t retval asm("x0");
	asm volatile ("mov x1, x2\n"
		      "mov x2, x3\n"
		      "mov x3, x4\n"
		      "mov x4, x5\n"
		      "mov x8, x6\n"
		      "svc #0");
	return retval;
}

void* getLR() {
	return __builtin_return_address(0);
}
