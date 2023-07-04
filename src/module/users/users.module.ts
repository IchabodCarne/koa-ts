import { DataTypes } from 'sequelize'
import sequelize from '../../utils/dbConnect'

const Users = sequelize.define(
  'Users',
  {
    id: {
      type: DataTypes.NUMBER,
      allowNull: false,
      primaryKey: true
    },
    account: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nickName: {
      type: DataTypes.STRING,
      field: 'nick_name'
    },
    phone: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    sign: {
      type: DataTypes.STRING
    },
    avatar: {
      type: DataTypes.BLOB
    },
    createTime: {
      type: DataTypes.TIME,
      field: 'create_time'
    },
    updateTime: {
      type: DataTypes.TIME,
      field: 'update_time'
    }
  },
  {
    tableName: 'user_t'
  }
)

export default Users
