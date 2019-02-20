const Koa = require('koa')
const bodyParser = require('koa-body')
const pool = require('../../dbconfig/dbconfig')

const app = new Koa()

app.use(bodyParser())

app.use(async ctx => {
  const postBody = await ctx.request.body
  const postItem = await postTodo(postBody.todoItem, postBody.todoDateAdded, postBody.todoStatus)
  ctx.body = `New todo created with todoID ${postItem[0].insertId}`
})

async function postTodo(todoItem, todoDateAdded, todoStatus) {
  try {
    const postedTodo = await pool.query(`
    INSERT INTO todo (todoItem, todoDateAdded, todoStatus) 
    VALUES ("${todoItem}", "${todoDateAdded}", "${todoStatus}");
    `)
    return postedTodo
  }catch(e){
    console.error(e)
  }
}

module.exports = app.callback()