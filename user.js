const express = require('express');
const upload =require('express-fileupload')
const bodyparser = require('body-parser');
const mysql = require('mysql');

const currentuser = express.Router();
currentuser.use(upload());
currentuser.use(bodyparser.json());

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "thinkdigital",
    database: "poolapp"
});

currentuser.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        next();
    })

currentuser.route('/upInfo')
    .post((req, res) => {
console.log(req.body);
console.log(req.files);
var file = req.files.filename
// var ty=file.name;
// function ext(p){
// return ty.split('.').pop();
// }
// var extn=ext(ty);
// console.log(extn);
// if((extn=='png' || extn=='jpeg' || extn=='jpg' || extn=='jfif')){
        var filenames=Date.now()+'-'+file.name
        const filepath=filenames;
 file.mv('./uploads1/'+filenames,function(err){
            console.log('entered');
            if(err){
                console.log(err);
            }else{
            console.log('entered1');    
            var userid = req.body.filename1;
       
    var sql = "UPDATE userinfo SET img = ? WHERE userid= ?"
    con.query(sql, [filepath, userid], (err, rows, fields)=> {
        if (!err){
            console.log('Updated successfully');
            res.send("Updated successfully");}
        else
            console.log(err);
    })
            }
 });
// }
// else{
//     console.log('please insert an image!!!!');
// res.send("please insert an image!!!!");
// }
});
//to get all info of current user
currentuser.route('/userInfo')
    .post((req, res) => {
        console.log('info');
        var ui = req.body.userIdNo;
        var query = " SELECT * FROM userinfo WHERE userid = (" + ui + ")";
        con.query(query, (err, results) => {
            if (err) res.send(err);
            else {
                //console.log("Got users from userid table");
                res.send(results);
            }
        });
    });

currentuser.route('/userInfoss')
    .post((req, res) => {
        console.log('infoss');
        var name = req.body.userns;
        console.log(name);
        var query = ' SELECT * FROM userinfo WHERE name = ("'+ name +'")';
        con.query(query, (err, results) => {
            if (err) console.log(err);
            else {
                
                res.send(results);
            }
        });
    });

    currentuser.route('/userInfos')
    .get((req, res) => {
        console.log('infos');
       var query = 'SELECT * FROM userinfo';
        con.query(query, (err, results) => {
            if (err) { console.log(err.message); res.send(err); }
            else {
                //console.log("Got exchange item from exchange table");
                res.send(results);
            }
        });
    });

//to get current users all pools
currentuser.route('/userPosts')
    .post((req, res) => {
        //var userIDno = 1;
        var id = req.body.userIdNo;
        const query = " SELECT * FROM pools WHERE userIDno = (" + id + ") ";
        con.query(query, (err, results) => {
            if (err) console.log(err);
            else {
                //console.log(results);
                res.send(results);
            }
        });
    });

//to get current users all items
currentuser.route('/userItems')
    .post((req, res) => {
        var i = req.body.userIdNo;
        const query = "SELECT *FROM exchange WHERE userIDno = (" + i + ")";
        con.query(query, (err, results) => {
            if (err) console.log(err);
            else {
                //console.log("Current user items: ", results);
                res.send(results);
            }
        });
    });

module.exports = currentuser;