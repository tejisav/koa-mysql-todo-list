const Koa = require('koa')
const bodyParser = require('koa-body')
const pool = require('../../dbconfig/dbconfig')

const app = new Koa()

app.use(bodyParser())

app.use(async ctx => {
  const deleteBody = await ctx.request.body
  await deleteTodo(deleteBody.todoItem)
  ctx.body = `Deleted todoItem ${deleteBody.todoItem}`
})

async function deleteTodo(todoItem) {
  try {
    const deletedTodo = await pool.query(`DELETE FROM todo WHERE todoItem LIKe '%${todoItem}%';`)
    return deletedTodo
  }catch(e){
    console.error(e)
  }
}

module.exports = app.callback()