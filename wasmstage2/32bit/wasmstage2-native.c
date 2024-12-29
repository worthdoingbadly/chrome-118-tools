typedef unsigned int uint32_t;
typedef unsigned char uint8_t;

uint32_t read32(uint32_t* addr) {
	return *addr;
}

void write32(uint32_t* addr, uint32_t unused_r1, uint32_t value) {
	*addr = value;
}

uint8_t read8(uint8_t* addr) {
	return *addr;
}

void write8(uint8_t* addr, uint32_t unused_r1, uint8_t value) {
	*addr = value;
}

struct syscall_args {
	uint32_t arg0;
	uint32_t arg1;
	uint32_t arg2;
	uint32_t arg3;
	uint32_t arg4;
	uint32_t arg5;
	uint32_t arg6;
	uint32_t syscall_nr;
};

uint32_t syscall(struct syscall_args* args) {
	register uint32_t r0;
	asm volatile ("push {r4, r5, r6, r7}\n"
			"ldmia r0, {r0, r1, r2, r3, r4, r5, r6, r7}\n"
			"svc #0\n"
			"pop {r4, r5, r6, r7}");
	return r0;
}

void* getLR() {
	return __builtin_return_address(0);
}
