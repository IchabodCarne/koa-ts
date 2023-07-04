import { Sequelize } from 'sequelize'
import { database, host, port, user, password } from '../config/DB'

const sequelize = new Sequelize(database, user, password, {
  host,
  port,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  define: {
    timestamps: false,
    freezeTableName: true
  },
  dialectOptions: {
    dateStrings: true,
    typeCast: true
  }
})

sequelize
  .authenticate()
  .then(function () {
    console.log('数据库连接成功')
  })
  .catch(function (err) {
    // 数据库连接失败时打印输出
    console.error(err)
    throw err
  })

export default sequelize
