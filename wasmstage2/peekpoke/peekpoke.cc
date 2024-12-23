#include <node.h>

namespace peekpoke {

using v8::BigInt;
using v8::Context;
using v8::FunctionCallbackInfo;
using v8::Isolate;
using v8::Local;
using v8::Object;
using v8::ReturnValue;
using v8::Value;
using v8::internal::Address;

namespace {

void AddrOf(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  // see v8::internal::ValueAsAddress
  Address addr = *reinterpret_cast<Address*>(*args[0]);
  ReturnValue retval = args.GetReturnValue();
  retval.Set(BigInt::New(isolate, addr));
}

void Read32(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  uintptr_t addr = args[0]
                       ->ToBigInt(isolate->GetCurrentContext())
                       .ToLocalChecked()
                       ->Uint64Value();
  uint32_t value = *(uint32_t*)addr;
  ReturnValue retval = args.GetReturnValue();
  retval.Set(value);
}

void Write32(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  uintptr_t addr = args[0]
                       ->ToBigInt(isolate->GetCurrentContext())
                       .ToLocalChecked()
                       ->Uint64Value();
  uint32_t value =
      args[1]->Uint32Value(isolate->GetCurrentContext()).ToChecked();
  *(uint32_t*)addr = value;
}

void Init(Local<Object> exports, Local<Value> module, void* priv) {
  NODE_SET_METHOD(exports, "addrof", AddrOf);
  NODE_SET_METHOD(exports, "read32", Read32);
  NODE_SET_METHOD(exports, "write32", Write32);
}

NODE_MODULE(NODE_GYP_MODULE_NAME, Init)
}  // namespace
}  // namespace peekpoke
