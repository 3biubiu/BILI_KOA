class UserService{

  // 数据库操作都是异步的所以要异步
  async createUser(user_name,password){
    //todo:写入数据库
    return '写入数据库成功'
  }
}

module.exports = new UserService