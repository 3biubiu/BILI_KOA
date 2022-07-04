const { createUser, getUserInfo, } = require('../service/user.service')
const { userRegisterError } = require('../constants/err.type')
const jwt = require('jsonwebtoken')

const { JWT_SECRET } = require("../config/config.default")
class UserController {
  async register(ctx, next) {
    //获取数据
    // console.log(ctx.request.body)
    const { user_name, password } = ctx.request.body
    // 合法性
    // const aaaa = await getUserInfo
    // console.log(getUserInfo({user_name}));
    // if(await getUserInfo({user_name})) {
    //   ctx.status = 409
    //   // console.log(getUserInfo({user_name}));
    //   // console.error(!user_name ? "用户名不能为空" : "密码不能为空");
    //   ctx.body = {
    //     code:'10002',
    //     message:"用户已经存在",
    //     result: ''
    //   }
    //   return 
    // }
    //操作数据库
    try {
      const res = await createUser(user_name, password)
      //返回结果
      // ctx.body = '用户注册成功'
      ctx.body = {
        code: 0, //代表成功
        message: '用户注册成功',
        result: {
          id: res.id,
          user_name: res.user_name
        }
      }
    } catch (err) {
      console.log(err);
      ctx.app.emit('error', userRegisterError, ctx)
    }

  }

  async login(ctx, next) {
    const { user_name } = ctx.request.body

    // ctx.body = '欢迎回来'

    //1 获取用户信息 playload (id username isadmin)
    try {
      const res = await getUserInfo({ user_name })
      // 剔除掉password
      const { password, ...resUser } = res

      ctx.body = {
        code: '0',
        message: '用户登录成功',
        result: {
          token: jwt.sign(res,JWT_SECRET,{expiresIn:'1d'})
        }
      }
    } catch (err) {
      console.error('用户登录失败',err)
    }
  }
}

module.exports = new UserController