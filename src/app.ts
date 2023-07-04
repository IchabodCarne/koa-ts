import Koa from 'koa'
import http from 'http'

const app = new Koa()

const serve = new http.Server(app.callback())
const address = serve.address()
const bind = typeof address === 'string' ? `pipe ${address}` : `port ${address?.port}`

app.use(async (ctx) => {
  ctx.body = 'Hello world'
})

serve.listen(9000)

serve.on('error', (error: any) => {
  if (error.syscall !== 'listen') {
    throw error
  }

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      break
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      break
    default:
      throw error
  }
})
serve.on('listening', () => {
  console.log(`Listening on ${bind}`)
})
