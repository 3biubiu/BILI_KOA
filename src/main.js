const Kao = require('koa')

const app = new Kao()

app.use((ctx,next) => {
  ctx.body = 'hello api-biubiubiubiu'
})

app.listen(3000, () => {
  console.log('server is running on http://localhost:3000');
})