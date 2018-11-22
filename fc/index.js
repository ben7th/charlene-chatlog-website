const router = require('./lib/router')

module.exports.handler = (req, resp, context) => {
  let route = router.find(req.method, req.path)

  console.log({ route })

  if (route) {
    route.handler({ req, resp, route })
      .then()
      .catch(e => {
        resp.setHeader('content-type', 'application/json')
        resp.send(JSON.stringify({ error: e }))
      })
  } else {
    resp.setHeader('content-type', 'application/json')
    resp.send(JSON.stringify({ error: 'no such API PATH' }))
  }
}