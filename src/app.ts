import Koa from 'koa'
import http from 'http'
// @ts-ignore
import onerror from 'koa-onerror'
import { koaBody } from 'koa-body'
import KoaLogger from 'koa-logger'
import KoaStatic from 'koa-static'
import KoaCors from 'koa-cors'

import log4js from './utils/logger'
import router from './router/index'

const app = new Koa()

onerror(app)

app.use(
  koaBody({
    multipart: true
  })
)
app.use(KoaLogger())
app.use(KoaStatic('./public'))
app.use(KoaCors())

const logger = log4js.getLogger('log')
app.use(
  log4js.connectLogger(logger, {
    level: log4js.levels.INFO.levelStr,
    format: (req, res, format) => format(`:remote-addr :method :url :status ${JSON.stringify(req.body)}`)
  })
)

app.use(router.routes())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

const serve = new http.Server(app.callback())

serve.listen(9000)
serve.on('error', (error: any) => {
  if (error.syscall !== 'listen') {
    throw error
  }

  const address = serve.address()
  const bind = typeof address === 'string' ? `pipe ${address}` : `port ${address?.port}`

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
  const address = serve.address()
  const bind = typeof address === 'string' ? `pipe ${address}` : `port ${address?.port}`
  console.log(`Listening on ${bind}`)
})
