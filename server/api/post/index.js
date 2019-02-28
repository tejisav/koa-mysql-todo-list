const Koa = require('koa')
const bodyParser = require('koa-body')
const pool = require('../../dbconfig/dbconfig')

const app = new Koa()

app.use(bodyParser())

app.use(async ctx => {
  const postBody = await ctx.request.body
  const postItem = await postTodo(postBody)
  ctx.body = `New todo created with todoID ${postItem[0].insertId}`
})

async function postTodo(postBody) {
  try {
    const postedTodo = await pool.query(`
    INSERT INTO todo (todoItem, todoDateAdded, todoStatus, todoDueBy) 
    VALUES ("${postBody.todoItem}", "${postBody.todoDateAdded}", "${postBody.todoStatus}", "${postBody.todoDueBy}");
    `)
    return postedTodo
  }catch(e){
    console.error(e)
  }
}

module.exports = app.callback()