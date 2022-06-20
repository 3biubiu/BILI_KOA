const {getUserInfo} = require('../service/user.service')

const {userFormateError,userAlreadyExisted} = require('../constants/err.type')
const userValidator = async (ctx, next) => {

  const{user_name,password} = ctx.request.body
  if(!user_name || !password){
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

const verifyUser = async(ctx,next) =>{

  const {user_name} = ctx.request.body

  if(await getUserInfo({user_name}) != null){
    ctx.status = 409
    ctx.app.emit('error', userAlreadyExisted, ctx)
    // ctx.body = {
    //   code:'10002',
    //   message:"用户已经存在",
    //   result: ''
    // }
    return 
  }

  await next()
}
module.exports ={
  userValidator,
  verifyUser
}