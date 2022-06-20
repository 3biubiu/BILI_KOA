const Koa = require('koa')

const errHandler = require('./errHandler')
const KoaBody = require('koa-body')
const userRouter = require("../router/user.route")

const app = new Koa()

app.use(KoaBody())

app.use(userRouter.routes())

//进行统一的事件处理
app.on('error',errHandler)

module.exports = app