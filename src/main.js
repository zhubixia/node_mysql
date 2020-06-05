const express = require('express')
const app = express()
const bodyParser = require('body-parser') // 解析参数
const cors = require('cors') // 解决跨域
const mysql = require('mysql')
const router = express.Router()

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

app.use(cors())
// 解析 application/json
app.use(bodyParser.json())
// 解析 application/x-wwww-form-urlencoded
// app.use(bodyParser.urlencoded())
app.listen(8089, () => {
  console.log('Server is running at http://10.150.149.130:8089/')
})

const connection = mysql.createConnection(option)

// 模拟是否登录成功
let isLogin = true
/* 使用app.all模拟登录拦截 */
app.all('*', (req, res, next) => {
  if (!isLogin) return res.json('未登录')
  next()
})
app.post('/api/login', (req, res) => {
  const sql = 'select * from sys_user'
  connection.query(sql, (err, data) => {
    if (err) {
      console.log('connecting error')
      return
    }
    return res.json(new Result({data}))
  })
  // res.end('登录页面！！！！')
})

app.get('/', (req, res) => {
  res.end('Welcome to visit my website')
})

app.get('/about', (req, res) => {
  res.end('This is about page！！！')
})

app.post('/test/:data', (req, res) => {
  return res.json({
    query: req.query,
    data: req.params,
    json: req.body
  })
})



function Result({code=0, msg='成功', data={}}){
  this.code = code
  this.msg = msg
  this.data = data
}