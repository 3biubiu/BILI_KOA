const User = require('../model/use.model.js')

class UserService {
  // 数据库操作都是异步的所以要异步
  async createUser(user_name, password) {
    //todo:写入数据库
    const res = await User.create({
      user_name,
      password
    })
    console.log(res);
    return res.dataValues

  }
  async getUserInfo({ id, user_name, password, is_admin }) {
    const whereOpt = {}

    id && Object.assign(whereOpt, { id })
    user_name && Object.assign(whereOpt, { user_name })
    password && Object.assign(whereOpt, { password })
    is_admin && Object.assign(whereOpt, { is_admin })

    const res = await User.findOne({
      attributes:  ['id', 'user_name', 'password', 'is_admin'],
      where: whereOpt
    })
    // res = await res
    console.log(res);
    return res  == null? null: res.dataValues
    
  }
}


module.exports = new UserService
