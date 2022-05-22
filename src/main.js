const Kao = require('koa')

const {APP_PORT} = require('./config/config.default')

const app = new Kao()

app.use((ctx,next) => {
  ctx.body = 'hello api-biubiubiubiu'
})

app.listen(APP_PORT, () => {
  console.log(`server is running on http://localhost:${APP_PORT}`);
})