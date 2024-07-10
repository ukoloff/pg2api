const http = require('node:http')
const pg = require('pg')

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
    .then(process)
    .then(omit_)
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

async function process(data) {
  var c = new pg.Client(data.connect)
  await c.connect()
  var res = await c.query(data.sql, data.values)
  await c.end()
  return res
}

function omit_(data) {
  Object.keys(data)
    .filter(x => /^_/.test(x))
    .forEach(x => delete data[x])
  return data
}
