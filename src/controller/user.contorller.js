const {createUser} = require('../service/use.service')

class UserController {
  async register(ctx,next){
    //获取数据
    // console.log(ctx.request.body)
    const {user_name,password} = ctx.request.body
    //操作数据库
    const res = await createUser(user_name,password)
    //返回结果
    ctx.body = '用户注册成功'
    ctx.body = res
  }

  async login(ctx,next){
    ctx.body ="登陆成功"
  }
}

module.exports = new UserController