const { DataTypes } = require('sequelize')

const seq = require('../db/seq')

// 创建模型
const User = seq.define('zd_user', {
  // id 会被sql 自动创建
  user_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    comment: '用户名，唯一'
  },
  password: {
    type: DataTypes.CHAR(64),
    allowNull: false,
    comment: '密码'
  },
  is_admin:{
    type:DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue:0,
    comment:'是否为管理员,0不是 '
  }

},{
  timestamps:false
})// (Model zd_user => zd_users) 自动推断表名

User.sync() //- 如果表不存在,则创建该表(如果已经存在,则不执行任何操作)
// User.sync({force:true}) // 创建表,如果存在就先删除在创建

module.exports  = User