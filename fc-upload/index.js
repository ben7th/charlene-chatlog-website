const getRawBody = require('raw-body')
const upload = require('./upload')
const multipart = require('parse-multipart')

module.exports.handler = function(req, resp, context) {
  var params = {
    path: req.path,
    queries: req.queries,
    headers: req.headers,
    method : req.method,
    requestURI : req.url,
    clientIP : req.clientIP,
  }
  
  // body is a buffer
  getRawBody(req, (err, body) => {
    let boundary = multipart.getBoundary(params.headers['content-type'])
    let parts = multipart.Parse(body, boundary)

    let part = parts[0]
    let filename = part.filename
    let filedata = part.data

    upload(filename, filedata)
      .then(res => {
        resp.send(JSON.stringify({ res }))
      })
      .catch(err => {
        resp.send(JSON.stringify({ err }))
      })
  })
}