import KoaRouter from 'koa-router'
import UsersController from '../../module/users/users.controller'

const router = new KoaRouter()

router.prefix('users')

router.get('/add', async ({ request, res }) => {
  try {
    // await UsersController.add(request.body)
  } catch (e) {
    console.log(e)
  }
})

export default router
