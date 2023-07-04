import UsersService from './users.service'

class UsersController {
  async add(user: User) {
    const addUser = await UsersService.add(user)
    if (!addUser.get('id')) {
      throw new Error('新增用户失败')
    }
  }
}

export default new UsersController()
