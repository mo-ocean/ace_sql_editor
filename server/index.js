const path = require('path');
const express = require('express');
const app = express();
const sql = require('./db')
app.get('/api/sql', (req, res, next) => {
  res.json({
      data: sql.result,
      table: sql.table
  })
})

// 监听端口
app.listen(3000);
console.log('success listen at port:3000......');