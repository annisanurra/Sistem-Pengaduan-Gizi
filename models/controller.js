const mysql = require('mysql');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

var conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'hospital_db'
});

conn.connect(function(err) {
    if(err) {
        throw err;
        
    }else {
        console.log('you are connected to database');
    }
});