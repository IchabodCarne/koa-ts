import Koa from 'koa'
import http from 'http'

const app = new Koa()

const serve = new http.Server(app.callback())

app.use(async (ctx) => {
  ctx.body = 'Hello world'
})

serve.listen(9000)
serve.on('listening', () => {
  const address = serve.address()
  console.log('Listening on', address)
})
