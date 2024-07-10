const http = require('node:http')
require('dotenv/config')

var send = {
  connect: pgCred(),
  sql: 'Select now()'
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

function pgCred() {
  var user = process.env.PGUSER || process.env.USER
  return {
    user: user,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST || 'localhost',
    port: process.env.PGPORT || 5432,
    database: process.env.PGDATABASE || user,
  }
}
