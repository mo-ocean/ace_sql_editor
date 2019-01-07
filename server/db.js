const mysql = require('mysql');

const mysqlConfig = {
  host: 't134U.holytoolz.com', // 新建数据库连接时的 主机名或ID地址 内容
  user: 'root',
  password: 'One2@Three', // root 密码
  database: 'BianText_1', // 数据库名
  port: '3306'
}
const pool = mysql.createPool({
  host: mysqlConfig.host,
  user: mysqlConfig.user,
  password: mysqlConfig.password,
  database: mysqlConfig.database,
  port: mysqlConfig.port,
  multipleStatements: true // 多语句查询
});

var setValue = function () {
  pool.getConnection((err, connection) => {
    // var sql = 'INSERT INTO exelistpush(id) VALUES (1)'
    var sql = 'select * from exelistpush'
    connection.query(sql, (err, result) => {
        console.log(result);
        module.exports.result = result;
        return result
      connection.release();
    })
  })
}
var getValue = function () {
  pool.getConnection((err, connection) => {
    // var sql = 'INSERT INTO exelistpush(id) VALUES (1)'
    var sql = 'show tables'
    connection.query(sql, (err, result) => {
        console.log(result);
        module.exports.table = result;
        return result
      connection.release();
    })
  })
}

setValue();
getValue();

// connection.connect();

// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });