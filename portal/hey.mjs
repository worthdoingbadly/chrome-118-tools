import { createServer } from "node:http";
import * as fs from "node:fs";
const fsPromises = fs.promises;
const filesToServe = {
  "/bnovkebin-0517.js": "/home/zhuowei/bnovkebin-0517.js",
  "/bnovkebin.html": "/home/zhuowei/bnovkebin.html",
  "/manfp-sandbox.js": "/home/zhuowei/manfp-sandbox.js",
  "/wasmstage2/wasmstage2-browser.js":
    "/home/zhuowei/wasmstage2/wasmstage2-browser.js",
  "/ohdear32bit/stage2.js": "/home/zhuowei/ohdear32bit/stage2.js",
  "/song.html": "/home/zhuowei/song.html",
  "/torn.m4a": "/home/zhuowei/torn.m4a",
  "/tryitforme.html": "/home/zhuowei/tryitforme.html",
};
const server = createServer((req, res) => {
  console.log(req.url);
  if (req.url.startsWith("/upload/")) {
    const filename = req.url.substring("/upload/".length).replace("/", "");
    const body = [];
    req
      .on("data", (chunk) => {
        body.push(chunk);
      })
      .on("end", () => {
        const fullBuffer = Buffer.concat(body);
        //fs.writeFileSync(filename, fullBuffer);
	fsPromises.writeFile(filename, fullBuffer);
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end("");
      });
    return;
  }
  const defaultUrl = "/bnovkebin.html";
  //const defaultUrl = "/tryitforme.html";
  const path = filesToServe[req.url] || filesToServe[defaultUrl];
  res.writeHead(200, { "Content-Type": "text/html" });
  //res.end('<h1>hello!</h1><script>document.write(navigator.userAgent);</script>!\n');
  res.end(fs.readFileSync(path));
});
// starts a simple http server locally on port 3000
server.listen(80, "0.0.0.0", () => {
  console.log("Listening");
});
