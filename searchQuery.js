const express = require('express');
const bodyparser = require('body-parser');
const mysql = require('mysql');

const searchRouter = express.Router();

searchRouter.use(bodyparser.json());


const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "thinkdigital",
    database: "poolapp"
});

searchRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        next();
    });

searchRouter.route('/pools')
    .post((req, res) => {
        var userquery = req.body.userquery;
        query = 'SELECT * FROM pools WHERE title LIKE "%' + userquery + '%" ';
        con.query(query, (err, results) => {
            if (err) res.send(err)
            else {
                res.send(results);
            }
        });
    });

searchRouter.route('/exchange')
    .post((req, res) => {
        var userquery = req.body.userquery;
        query = 'SELECT * FROM exchange WHERE title LIKE  "%' + userquery + '%" ';
        con.query(query, (err, results) => {
            if (err) res.send(err)
            else {
                res.send(results);
            }
        });
    });

module.exports = searchRouter;