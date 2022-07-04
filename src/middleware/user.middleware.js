const { getUserInfo } = require('../service/user.service')
const bcrypt = require('bcryptjs')
const {
  userFormateError,
  userAlreadyExisted,
  userRegisterError,
  userDoesNotExist,
  userLoginError,
  invalidPassword
}
  = require('../constants/err.type')
const userValidator = async (ctx, next) => {

  const { user_name, password } = ctx.request.body
  if (!user_name || !password) {
    ctx.status = 409
    // console.log(getUserInfo({user_name}));
    ctx.app.emit('error', userFormateError, ctx)

    // console.error("用户名或密码不能为空",ctx.request.body);
    // ctx.body = {
    //   code:'10001',
    //   message:"用户名不能为空",
    //   result: ''
    // }
    return
  }
  await next()
}
const crpyPassword = async (ctx, next) => {
  const { password } = ctx.request.body
  const salt = bcrypt.genSaltSync(10);
  //哈希保存密文
  const hash = bcrypt.hashSync(password, salt)

  ctx.request.body.password = hash

  await next()
}
const verifyUser = async (ctx, next) => {

  const { user_name } = ctx.request.body
  try {
    const res = await getUserInfo({ user_name })
    if (res) {
      console.error('用户名已经存在', { user_name });
      ctx.status = 409
      ctx.app.emit('error', userAlreadyExisted, ctx)
      // ctx.body = {
      //   code:'10002',
      //   message:"用户已经存在",
      //   result: ''
      // }
      return
    }
  } catch (err) {
    console.error('获取用户信息错误', err);

    ctx.app.emit('error', userRegisterError, ctx)
    return
  }
  await next()
}

const verifyLogin = async (ctx, next) => {
  //用户是否存在.密码是否匹配
  const { user_name, password } = ctx.request.body

  const res = await getUserInfo({ user_name })

  try {
    if (!res) {
      console.error('用户名不存在', { user_name })
      ctx.app.emit('error', userDoesNotExist, ctx)
      return
    }
    if (!bcrypt.compareSync(password, res.password)) {
      ctx.app.emit('error', invalidPassword, ctx)
      return
    }
  } catch (error) {
    console.error(error)
    ctx.app.emit('error', userLoginError, ctx)
    return
  }


  await next()

}
module.exports = {
  userValidator,
  verifyUser,
  crpyPassword,
  verifyLogin
}