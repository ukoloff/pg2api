const http = require('node:http')

http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json')
  // res.writeHead(200)

  if (req.method != 'POST') {
    res.setHeader('Location', 'https://github.com/ukoloff/pg2api')
    res.writeHead(301)
    res.end()
    return
  }

  read(req)
    .then(JSON.parse)
    .then(j => ({
      hello: 'World!',
      got: j,
      pid: process.pid,
    }))
    .catch(e => ({
      error: e.name,
      message: e.message
    }))
    .then(JSON.stringify)
    .then(json => res.end(json))
}).listen(5432, 'localhost')

function read(stream) {
  return new Promise(resolve => {
    var body = ''
    stream.on('data', chunk => body += chunk)
    stream.on('end', _ => resolve(body))
  })
}
