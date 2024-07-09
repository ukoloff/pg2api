const http = require('node:http')

http.createServer((req, res) => {
  res.writeHead(200);
  res.end(`Hello, world[${process.pid}]!`);
}).listen(5432, 'localhost')
