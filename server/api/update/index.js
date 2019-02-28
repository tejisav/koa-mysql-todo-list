const Koa = require('koa')
const bodyParser = require('koa-body')
const pool = require('../../dbconfig/dbconfig')

const app = new Koa()

app.use(bodyParser())

app.use(async ctx => {
  const updateBody = await ctx.request.body
  await updateTodo(updateBody)
  ctx.body = JSON.stringify(updateBody)
})

async function updateTodo(updateBody) {
  try {
    var addComma = false;

    var query = `UPDATE todo SET `
    
    if (updateBody.todoDateAdded) {
      query += `todoDateAdded='${updateBody.todoDateAdded}'`
      addComma = true;
    }
    if (updateBody.todoStatus) {
      if (addComma) {
        query += `, `
      }
      query += `todoStatus=${updateBody.todoStatus}`
      addComma = true;
    }
    if (updateBody.todoDueBy) {
      if (addComma) {
        query += `, `
      }
      query += `todoDueBy='${updateBody.todoDueBy}'`
      addComma = true;
    }
    query += ` WHERE todoItem LIKe '%${updateBody.todoItem}%';`
    const updatedTodo = await pool.query(query)
    return updatedTodo
  }catch(e){
    console.error(e)
  }
}

module.exports = app.callback()