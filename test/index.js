const http = require('node:http')

http.get('http://localhost:5432', get)

function get(res) {
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
