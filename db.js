const mysql = require('mysql');

const config = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'hospital_db'
});

module.exports = {
    config,
};

