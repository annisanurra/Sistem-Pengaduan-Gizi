// const express = require('express');
// const router = express.Router();
// const bodyParser = require('body-parser');
// // const db = require.main.require('../models/controller');
// const mysql = require('mysql');
// const session = require('express-session');
// const { check, validationResult } = require('express-validator');

// var conn = mysql.createConnection({
//     host:'localhost',
//     user:'root',
//     password:'',
//     database:'hospital_db'
// });

// // router.use(session({

// // }))

// router.get('/', function(req, res) {
//     res.render('login.ejs')
// })

// router.use(bodyParser.json());
// router.use(bodyParser.urlencoded({ extended: true }));

// router.post('/', [check('username').notEmpty().withMessage("username is required"),
//     check('password').notEmpty().withMessage("password is required")
// ], function(req, res) {
//     const errors = validationResult(req);
//     if(!errors.isEmpty()){
//         return res.status(404).json({errors:errors.array()})
//     }
//     var username = req.body.username;
//     var password = req.body.password;

//     if(username&&password) {
//         conn.query('select * from user where username = "admin" and password = "admin_rs"', [username, password],
//             function(error, results, fields) {
//                 if(results.length>0) {
//                     request.session.loggedIn = true;
//                     request.session.username = username;
                    
//                 }
//             }
//         )
//     }
// })

// module.exports = router;