const Router = require('koa-router')

// const {userValidator} = require('../middleware/user.middleware')
const {register,login} = require('../controller/user.contorller')
const { userValidator,verifyUser ,crpyPassword} = require('../middleware/user.middleware')
const router = new Router({
  prefix:'/users'
})

router.get('/',(ctx,next) => {
  ctx.body = 'HELLO USERS'
})

// 注册接口
router.post('/register',userValidator, verifyUser,crpyPassword, register)

//登录接口
router.post('/login',login)

module.exports = router