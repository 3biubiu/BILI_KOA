const User = require('../model/use.model.js')

class UserService{ 
  // 数据库操作都是异步的所以要异步
  async createUser(user_name,password){
    //todo:写入数据库
    const res = await User.create({
      user_name,
      password
    })
    console.log(res);
    return res.getDataValue

  }
}

module.exports = new UserService
