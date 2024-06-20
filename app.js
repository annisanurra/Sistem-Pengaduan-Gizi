const express = require('express');
const session = require("express-session");
const ejs = require('ejs');
const bodyParser = require('body-parser');
// const db = require('./models/controller');
const db = require("./db").config;
// var login = require('./controllers/login');
const { check, validationResult } = require('express-validator');

const app = express();
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

db.connect(function(err) {
    if(err) {
        console.log(err);
        
    }else {
        console.log('you are connected to database');
    }
});

// app.use('/login', login);
app.get("/dashboard", (req, res) => {
    let pasienCountQuery = "SELECT COUNT(*) AS count FROM pasien";
    let aduanCountQuery = "SELECT COUNT(*) AS count FROM komplain";
    let complaintsQuery = `
        SELECT 
            pasien.nama, pasien.alamat, pasien.telp, pasien.tanggalLahir, pasien.jenisKelamin, pasien.penyakit, pasien.ruang, komplain.aduan
        FROM 
            komplain
        INNER JOIN 
            pasien ON komplain.pasienId = pasien.id
    `;

    db.query(pasienCountQuery, (err, pasienCountResult) => {
        if (err) {
            console.error("Database query error:", err);
            res.status(500).send("Internal server error");
            return;
        }

        db.query(aduanCountQuery, (err, aduanCountResult) => {
            if (err) {
                console.error("Database query error:", err);
                res.status(500).send("Internal server error");
                return;
            }

            db.query(complaintsQuery, (err, complaintsResult) => {
                if (err) {
                    console.error("Database query error:", err);
                    res.status(500).send("Internal server error");
                    return;
                }

                res.render("adminpage", {
                    pasienCount: pasienCountResult[0].count,
                    aduanCount: aduanCountResult[0].count,
                    complaints: complaintsResult
                });
            });
        });
    });
});

app.get("/complaints", (req, res) => {
    res.render("formpage");
});

app.get("/try", (req, res) => {
    res.render("dashboard");
});

app.get("/success", (req, res) => {
    res.render("index");
});

app.get("/logout", (req, res) => {
	req.session.destroy((err) => {
		if (err) {
			console.log(err);
		} else {
			res.redirect("/");
		}
	});
});

app.get("/", (req, res) => {
    res.render("login");
});

app.post("/login", (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let query = "SELECT * FROM user WHERE username = ? AND password = ?";

    db.query(query, [username, password], (err, result) => {
        if (err) {
            console.error("Database query error:", err);
            res.status(500).send("Internal server error");
            return;
        }

        if (result.length === 1) {
            res.redirect("/dashboard");
        } else {
            res.redirect("/");
        }
    });
});

app.post("/complaints", (req, res) => {
    let { nama, alamat, telp, tanggalLahir, jenisKelamin, penyakit, ruang, aduan } = req.body;

    let query1 = "INSERT INTO pasien (nama, alamat, telp, tanggalLahir, jenisKelamin, penyakit, ruang) VALUES (?, ?, ?, ?, ?, ?, ?)";
    
    db.query(query1, [nama, alamat, telp, tanggalLahir, jenisKelamin, penyakit, ruang], (err, result) => {
        if (err) {
            console.error("Database insert error:", err);
            res.status(500).send("Internal server error");
            return;
        }

        let pasienId = result.insertId;
        let query2 = "INSERT INTO komplain (aduan, pasienId) VALUES (?, ?)";

        db.query(query2, [aduan, pasienId], (err, result) => {
            if (err) {
                console.error("Database insert error:", err);
                res.status(500).send("Internal server error");
                return;
            }

            res.redirect("/success");
        });
    });
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});