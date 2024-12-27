Trying to port some Chrome 118 renderer proof-of-concepts to arm64:
 - In-sandbox read/write using [CVE-2024-0517](https://nvd.nist.gov/vuln/detail/CVE-2024-0517) exploit from [bnovkebin](https://bnovkebin.github.io/blog/CVE-2024-0517/) / [Exodus](https://blog.exodusintel.com/2024/01/19/google-chrome-v8-cve-2024-0517-out-of-bounds-write-code-execution/)
 - V8 Sandbox bypass using [CVE-2024-2887](https://nvd.nist.gov/vuln/detail/cve-2024-2887) [exploit](https://crbug.com/330575498) from [_manfp](https://www.zerodayinitiative.com/blog/2024/5/2/cve-2024-2887-a-pwn2own-winning-bug-in-google-chrome)
 - Some custom arm64 shellcode.

Doesn't work yet - runs in [Electron v27.2.0](https://github.com/electron/electron/releases/tag/v27.2.0) on arm64, but only once - doesn't work after a refresh.
Doesn't work on the Chrome 118-based browser on the Amazon Echo Show 5.

```
cd exploits && npx http-server -c-1
`electron-v27.2.0/electron --enable-logging=stderr --js-flags="--allow-natives-syntax" http://localhost:8080/bnovkebin.html
```
