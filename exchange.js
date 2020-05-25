const express = require('express');
const bodyparser = require('body-parser');

const upload =require('express-fileupload')
const exchangeRouter = express.Router();
var app = express();
exchangeRouter.use(upload());


const cors=require('cors');
app.use(cors());
exchangeRouter.use(bodyparser.json());



const mysql = require('mysql');
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "poolapp"
});


exchangeRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        next();
    });

 
exchangeRouter.route('/makePost')
    .post((req, res) => {
        // var title = req.body.title;
        // var category = req.body.category;
        // var description = req.body.description;
        // var contactInfo = req.body.contactInfo;
        // var useridno = req.body.userIdno;
        // var username = req.body.username;
        // let posttime = req.body.posttime;

console.log(req.files);
if(req.files)
{console.log('if');
    var file = req.files.filename
        var filenames=Date.now()+'-'+file.name
        const filepath='uploads' + '/' +filenames;
        console.log(filenames) 
         file.mv('./uploads/'+filenames,function(err){
            console.log('entered');
            if(err){
                console.log(err);
            }else{
            console.log('entered1');    
        var title = req.body.filename1;
       
        var category = req.body.filename2;
        var description = req.body.filename3;
        var contactInfo = req.body.filename4;
        var useridno = req.body.filename5;
        var username = req.body.filename6;
        let posttime = req.body.filename7;
        let photo = filepath;


               var query = 'INSERT INTO exchange (title, category, description, contactInfo,userIDno,username,posttime,photo) VALUES ("' + title + '", "' + category + '", "' + description + '", "' + contactInfo + '", "' + useridno + '","' + username + '","' + posttime + '","'+ photo +'")';

        con.query(query, (err, results) => {
            if (err) {
                res.send(err);
                console.log(err);
            } else {
                //console.log("Exchange item created");
                console.log('item inserted successfully');
                res.send("Item created");
            }
        });
        console.log('File Uploaded');
            }
            });
}
else{console.log('else');
        var filenames='sail.ico'
    const filepath='uploads' + '/' +filenames
     var title = req.body.filename1;
       
        var category = req.body.filename2;
        var description = req.body.filename3;
        var contactInfo = req.body.filename4;
        var useridno = req.body.filename5;
        var username = req.body.filename6;
        let posttime = req.body.filename7;
        let photo = filepath;
        var query = 'INSERT INTO exchange (title, category, description, contactInfo,userIDno,username,posttime,photo) VALUES ("' + title + '", "' + category + '", "' + description + '", "' + contactInfo + '", "' + useridno + '","' + username + '","' + posttime + '","'+ photo +'")';

        con.query(query, (err, results) => {
            if (err) {
                res.send(err);
                console.log(err);
            } else {
                //console.log("Exchange item created");
                console.log('item inserted successfully');
                res.send("Item created");
            }
        }) 
        console.log('File Uploaded');
}


    })

exchangeRouter.route('/readPosts')
    .get((req, res) => {
        var query = 'SELECT * FROM exchange ORDER BY exchangeid DESC';
        con.query(query, (err, results) => {
            if (err) { console.log(err.message); res.send(err); }
            else {
                //console.log("Got exchange item from exchange table");
                res.send(results);
            }
        });
    })

//for comments
//to make a comment
exchangeRouter.route('/makeComment')
    .post((req, res) => {
        var postid = req.body.postid;
        var username = req.body.username;
        var comment = req.body.comment;
        var userid = req.body.userid;
        query = 'INSERT INTO exchangecomments (postid,userid,username,comment) VALUES ("' + postid + '" , "' + userid + '" , "' + username + '" , "' + comment + '")';
        con.query(query, (err, results) => {
            if (err) res.send(err)
            else {
                //console.log("comment written on exchange");
                res.send({
                    success: true,
                    message: "comment made succesfully"
                });
            }
        });
    });

//to read comments
exchangeRouter.route('/readComments')
    .post((req, res) => {
        var postid = req.body.postid;
        query = 'SELECT * FROM exchangecomments WHERE postid = ("' + postid + '") ';
        con.query(query, (err, results) => {
            if (err) res.send(err)
            else {
                //console.log("comments from exchange");
                res.send(results);
            }
        });
    });

module.exports = exchangeRouter;