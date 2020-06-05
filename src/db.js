const mysql = require('mysql')

/* 数据库链接配置项 */
const option = {
  host: 'localhost',
  user: 'root',
  password: '3214002428Zbx',
  port: '3306',
  database: 'node_db',
  connectTimeout: 5000, // 连接超时
  multipleStatements: false // 是否允许一个query中包含多条sql语句
}


/* 连接数据库 */
const connection = mysql.createConnection(option)

connection.connect((err) => {
  if (err) {
    console.log('error connecting:' + err.stack)
    return
  }
  console.log('connected as id' + connection.threadId)
})
