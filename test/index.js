const http = require('node:http')

var send = {
  preved: 'Медвед!',
  pid: process.pid,
}

http.request('http://localhost:5432', {
  method: 'POST'
}, got)
  .end(JSON.stringify(send))

function got(res) {
  console.log('GOT!')
  console.log('Status:', res.statusCode)
  console.log('Headers:', res.headers)
  read(res)
    .then(JSON.parse)
    .then(console.log)
}

function read(stream) {
  return new Promise(resolve => {
    var body = ''
    stream.on('data', chunk => body += chunk)
    stream.on('end', _ => resolve(body))
  })
}
