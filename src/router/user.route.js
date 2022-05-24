const Router = require('koa-router')

const {register,login} = require('../controller/user.contorller')
const router = new Router({
  prefix:'/users'
})

router.get('/',(ctx,next) => {
  ctx.body = 'HELLO USERS'
})

// 注册接口
router.post('/register',register)

//登录接口
router.post('/login',login)

module.exports = router