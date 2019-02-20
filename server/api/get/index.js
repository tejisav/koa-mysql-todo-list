const Koa = require('koa')
const bodyParser = require('koa-body')
const pool = require('../../dbconfig/dbconfig')

const app = new Koa()

app.use(bodyParser())

app.use(async ctx => {
  const returnedTodos = await getTodos()
  ctx.body = returnedTodos
})

async function getTodos() {
  try {
    const updatedTodos = await pool.query(`SELECT * FROM todo;`)
    return updatedTodos[0]
  }catch(e){
    console.error(e)
  }
}

module.exports = app.callback()