const http = require('node:http')

http.get('http://localhost:5432', get)

function get(res) {
  console.log('GOT!')
  console.log('Status:', res.statusCode)
  console.log('Headers:', res.headers)
  res.pipe(process.stdout)
}
