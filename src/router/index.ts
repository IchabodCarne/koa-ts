import KoaRouter from 'koa-router'

const router = new KoaRouter()

import users from './routes/users'

router.use('/api', users.routes(), users.allowedMethods())

export default router
