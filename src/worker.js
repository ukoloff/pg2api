const http = require('node:http')
const pg = require('pg')

const connect = {
  application_name: 'pg2api.js',
  ssl: {
    rejectUnauthorized: false,
  },
}

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
  var c = new pg.Client({ ...connect, ...data.connect })
  var tA = new Date
  await c.connect()
  var tB = new Date
  var res = await c.query(data.sql, data.values)
  var tC = new Date
  await c.end()
  var tD = new Date
  res.ms = {
    connect: tB - tA,
    query: tC - tB,
    close: tD - tD,
  }
  return res
}

function omit_(data) {
  Object.keys(data)
    .filter(x => /^_/.test(x))
    .forEach(x => delete data[x])
  return data
}
