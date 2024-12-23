import { createServer } from 'node:http';
import * as fs from 'node:fs';
const filesToServe = {
	"/bnovkebin-0517.js": '/home/zhuowei/bnovkebin-0517.js',
	"/bnovkebin.html": '/home/zhuowei/bnovkebin.html',
	"/song.html": '/home/zhuowei/song.html',
	"/torn.m4a": '/home/zhuowei/torn.m4a',
};
const server = createServer((req, res) => {
  console.log(req.url);
  //const defaultUrl = "/bnovkebin.html";
  const defaultUrl = "/song.html";
  const path = filesToServe[req.url] || filesToServe[defaultUrl];
  res.writeHead(200, { 'Content-Type': 'text/html' });
  //res.end('<h1>hello!</h1><script>document.write(navigator.userAgent);</script>!\n');
  res.end(fs.readFileSync(path));
});
// starts a simple http server locally on port 3000
server.listen(80, '0.0.0.0', () => {
  console.log('Listening');
});
