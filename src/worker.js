const http = require('node:http')

http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.writeHead(200)
  var out = {
    hello: 'World!',
    pid: process.pid,
  }
  res.end(JSON.stringify(out))
}).listen(5432, 'localhost')
