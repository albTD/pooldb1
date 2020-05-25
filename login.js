const express = require('express');
const bodyparser = require('body-parser');
const mysql = require('mysql');
const bcrypt = require('bcrypt'); //for password encryption

const loginRouter = express.Router();
loginRouter.use(bodyparser.json());

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "poolapp"
});

loginRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        next();
    })
    .post((req, res) => {
        var email = req.body.email;
        var password = req.body.password;
        //console.log(req.body);
        query1 = 'SELECT * FROM userinfo WHERE email=("' + email + '") ';
        con.query(query1, (err, results) => {
            if (err) {
                console.log(err);
            } else {
                if (results.length == 0) {
                    console.log("Wrong credentials");
                    res.send({
                        success: false,
                        message: "Invalid credentials"
                    });
                } else {
                    query2 = 'SELECT password FROM userinfo WHERE email = ("' + email + '")'
                    con.query(query2, (err, results) => {
                        //console.log(`The password in MySql Db is ${results[0].password}`);
                        if (err) res.send(err);
                        else {
                            bcrypt.compare(password, results[0].password).then(resu => {
                                //console.log(`Password match is: ${resu}`);
                                if (resu) {
                                    query3 = 'SELECT * FROM userinfo WHERE email = ("' + email + '") ';
                                    con.query(query3, (err, results) => {
                                        if (err) res.send(err)
                                        else {
                                            //console.count(`User no: `);
                                            console.log(`Login by User id : ${results[0].userid} at ${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`);
                                            var id = results[0].userid;
                                            var name = results[0].name;
                                            var email = results[0].email;
                                            res.send({
                                                success: true,
                                                status: 200,
                                                id: id,
                                                name: name,
                                                email: email,
                                                message: "correct credentials, login succesful"
                                            });
                                        }
                                    });
                                } else {
                                    res.send({
                                        success: false,
                                        status: 204,
                                        message: "Incorrect credentials"
                                    });
                                }
                            }).catch(err => {
                                console.log(err);
                            });
                        };
                    });
                };
            }
        });
    });

    module.exports = loginRouter;