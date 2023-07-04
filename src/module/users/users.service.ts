import dayjs from 'dayjs'
import { Op } from 'sequelize'
import UsersModule from './users.module'

class UsersService {
  private queryUserFields: string[] = ['id', 'account', 'role', 'nickName', 'phone', 'email', 'sign', 'avatar']
  private createUserFields: string[] = [
    'account',
    'password',
    'role',
    'nickName',
    'phone',
    'email',
    'sign',
    'avatar',
    'createTime',
    'updateTime'
  ]

  async getUser(offset: number, limit: number) {
    return await UsersModule.findAndCountAll({
      order: ['id'],
      raw: true,
      offset,
      limit
    })
  }

  async getAllUserName() {
    return await UsersModule.findAll({
      attributes: ['id', 'nickName'],
      raw: true
    })
  }

  async getUserByAccountOrNickName(search: string) {
    return await UsersModule.findAndCountAll({
      where: {
        [Op.or]: [{ account: search }, { nickName: search }]
      },
      raw: true
    })
  }

  async add(user: User) {
    return await UsersModule.create(
      {
        account: user.account,
        password: '1234',
        role: user.role,
        nick_name: user.nickName,
        phone: user.phone,
        email: user.email,
        sign: user.sign,
        avatar: user.avatar,
        create_time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        update_time: dayjs().format('YYYY-MM-DD HH:mm:ss')
      },
      {
        fields: this.createUserFields,
        raw: true
      }
    )
  }

  async batchAdd(users: User[]) {
    const bulkData = users.map((user) => {
      const { account, nickName, role, phone, email } = user
      return {
        account: `${account}`,
        password: '1234',
        role: `${role}`,
        nick_name: `${nickName}`,
        phone: `${phone}`,
        email: `${email}`
      }
    })
    return await UsersModule.bulkCreate(bulkData)
  }

  async update(user: User) {
    user.updateTIme = dayjs().format('YYYY-MM-DD HH:mm:ss')
    return await UsersModule.update(user, {
      where: {
        id: user.id
      }
    })
  }

  async delete(ids: number[]) {
    return await UsersModule.destroy({
      where: {
        id: { [Op.in]: ids }
      }
    })
  }

  async resetPassword(id: number) {
    return await UsersModule.update(
      {
        password: '1234',
        updateTIme: dayjs().format('YYYY-MM-DD HH:mm:ss')
      },
      {
        where: {
          id
        }
      }
    )
  }
}

export default new UsersService()
