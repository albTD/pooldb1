const express = require('express');
const bodyparser = require('body-parser');
const mysql = require('mysql');

const poolRouter = express.Router();
poolRouter.use(bodyparser.json());


const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "thinkdigital",
    database: "poolapp"
});

poolRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200
        next();
    });

//to create a new post
poolRouter.route('/makePost')
    .post((req, res) => {
        var title = req.body.title;
        var description = req.body.description;
        var category = req.body.category;
        var location = req.body.location;
        var memreq = req.body.memreq;
        var dateOfPool = req.body.dateOfPool;
        var preference = req.body.preference;
        var contactInfo = req.body.contactInfo;
        var contactBeforeDate = req.body.contactBeforeDate;
        var contactBeforeTime = req.body.contactBeforeTime;
        var useridno = req.body.userIdno;
        var username = req.body.username;
        let posttime = req.body.posttime;

        var query = 'INSERT INTO pools (title, description, category, location, membersRequired, dateOfPool, preference, contactInfo, date, time, userIDno,username,posttime) VALUES ("' + title + '", "' + description + '", "' + category + '", "' + location + '", "' + memreq + '", "' + dateOfPool + '", "' + preference + '", "' + contactInfo + '" ,"' + contactBeforeDate + '","' + contactBeforeTime + '","' + useridno + '","' + username + '","' + posttime + '")';
        con.query(query, (err, results) => {
            if (err) {
                res.send(err);
                console.log(err);
            } else {
                console.log("New pool added");
                res.send("Pool added to database");
                //query for creating a table for group chat as soon as user creates a pools
                query2 = 'CREATE TABLE `' + title + '` (chatid INT  AUTO_INCREMENT primary key NOT NULL, name VARCHAR(255) NULL ,message VARCHAR(255) NULL , postid INT NULL,userid INT NULL)';
                con.query(query2, (err, result) => {
                    if (err) {
                        console.log(err);
                        //res.send(err);
                    } else {
                        console.log(`Table created with title: ${title}`);
                        //res.send("Sucess");
                    }
                });
            }
        }); 
    });


//to get all pool posts
poolRouter.route('/readPosts')
    .get((req, res) => {
        var query = ' SELECT * FROM pools ORDER BY poolid DESC ';
        con.query(query, (err, results) => {
            if (err) res.send(err);
            else {
                //console.log("Got title and description from pools");
                res.send(results);
            }
        });
    });


//to make comment under a pool post
poolRouter.route('/makeComment')
    .post((req, res) => {
        var userid = req.body.userid;
        var username = req.body.username;
        var postid = req.body.postid;
        var comment = req.body.comment;
        var query = 'INSERT INTO poolcomments (userid,username,postid,comment) VALUES ("' + userid + '" , "' + username + '" ,"' + postid + '", "' + comment + '")';
        con.query(query, (err, results) => {
            if (err) {
                res.send(err);
                console.log(err);
            } else {
                //console.log("comment was made");
                res.send({
                    success: true,
                    message: "comment was made on a post"
                });
            };
        });
    });

//to read comment under a pool post
poolRouter.route('/readComments')
    .post((req, res) => {
        var postid = req.body.postid;
        query = 'SELECT * FROM poolcomments WHERE postid = ("' + postid + '");';
        con.query(query, (err, results) => {
            if (err) res.send(err)
            else {
                //console.log(`comment data: ${results}`);
                res.send(results);
            }
        });
    });

module.exports = poolRouter;