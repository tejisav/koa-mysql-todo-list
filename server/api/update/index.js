const Koa = require('koa')
const bodyParser = require('koa-body')
const pool = require('../../dbconfig/dbconfig')

const app = new Koa()

app.use(bodyParser())

app.use(async ctx => {
  const updateBody = await ctx.request.body
  await updateTodo(updateBody.todoItem, updateBody.todoDueBy)
  ctx.body = { "todoItem": `${updateBody.todoItem}`, "todoDueBy": `${updateBody.todoDueBy}` }
})

async function updateTodo(todoItem, todoDueBy) {
  try {
    const updatedTodo = await pool.query(`UPDATE todo SET todoDueBy='${todoDueBy}' WHERE todoItem LIKe '%${todoItem}%';`)
    return updatedTodo
  }catch(e){
    console.error(e)
  }
}

module.exports = app.callback()