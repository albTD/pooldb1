const express = require('express');
const upload =require('express-fileupload')
const bodyparser = require('body-parser');
const mysql = require('mysql');
const saltRounds = 10;
const bcrypt = require('bcrypt'); //for password encryption

const signUpRouter = express.Router();
signUpRouter.use(upload());
signUpRouter.use(bodyparser.json());

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "poolapp"
});

signUpRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        next();
    });
    signUpRouter.route('/yoyo').post((req, res) => {
        // var name = req.body.name;
        // var email = req.body.email;
        // var unHashedPassword = req.body.password;
        // var mobile = req.body.mobile;
        // var regno = req.body.regno;
        // var gender = req.body.gender;
console.log(req.body);
console.log(req.files);
if(req.files){
        var file = req.files.filename
        var filenames=Date.now()+'-'+file.name
        const filepath='uploads1' + '/' +filenames;
        console.log(filenames)
        file.mv('./uploads1/'+filenames,function(err){
            console.log('entered');
            if(err){
                console.log(err);
            }else{
            console.log('entered1');    
             var name = req.body.filename1;
         var email = req.body.filename2;
         var unHashedPassword = req.body.filename3;
         var mobile = req.body.filename4;
         var regno = req.body.filename6;
         var gender = req.body.filename7;
         var img=filepath;
        //to check if email is already registered
        query1 = 'SELECT email FROM userinfo WHERE email = ("' + email + '") ';
        con.query(query1, (err, results) => {
            if (err) console.log(err)
            else {
                if (results.length == 0) {
                    bcrypt.hash(unHashedPassword, saltRounds).then(hash => {
                        var hashedPassword = hash;
                        //console.log(`Hashed password is ${hashedPassword}`);
                        var query = 'INSERT INTO userinfo (name,email,password,mobile,regno,gender,img) VALUES ("' + name + '", "' + email + '", "' + hashedPassword + '", "' + mobile + '", "' + regno + '", "' + gender + '", "' + img + '")';

                        con.query(query, (err, results) => {
                            if (err) {
                                console.log(err);
                                res.send(err);
                            } else {
                                console.log("New user account generated");
                                res.send({
                                    success: true,
                                    message: "ACCOUNT CREATED"
                                });
                            }
                        });
                    }).catch(err => {
                        console.log("Error is: ", err)
                    });
                } else {
                    //console.log("EMAIL ALREADY REGISTERED PLEASE ENTER A DIFFERENT EMAIL");
                    res.send({
                        success: false,
                        message: "EMAIL ALREADY EXISTS"
                    });
                }
            }
        
        });
            }
        });
}
else{
     var filenames='sail.ico'
    const filepath='uploads1' + '/' +filenames
     var name = req.body.filename1;
         var email = req.body.filename2;
         var unHashedPassword = req.body.filename3;
         var mobile = req.body.filename4;
         var regno = req.body.filename6;
         var gender = req.body.filename7;
         var img=filepath;
         query1 = 'SELECT email FROM userinfo WHERE email = ("' + email + '") ';
        con.query(query1, (err, results) => {
            if (err) console.log(err)
            else {
                if (results.length == 0) {
                    bcrypt.hash(unHashedPassword, saltRounds).then(hash => {
                        var hashedPassword = hash;
                        //console.log(`Hashed password is ${hashedPassword}`);
                        var query = 'INSERT INTO userinfo (name,email,password,mobile,regno,gender,img) VALUES ("' + name + '", "' + email + '", "' + hashedPassword + '", "' + mobile + '", "' + regno + '", "' + gender + '", "' + img + '")';

                        con.query(query, (err, results) => {
                            if (err) {
                                console.log(err);
                                res.send(err);
                            } else {
                                console.log("New user account generated");
                                res.send({
                                    success: true,
                                    message: "ACCOUNT CREATED"
                                });
                            }
                        });
                    }).catch(err => {
                        console.log("Error is: ", err)
                    });
                } else {
                    //console.log("EMAIL ALREADY REGISTERED PLEASE ENTER A DIFFERENT EMAIL");
                    res.send({
                        success: false,
                        message: "EMAIL ALREADY EXISTS"
                    });
                }
            }
        
        });
}
    });




    signUpRouter.route('/yoyo2').post((req, res) => {
 var name = req.body.filename1;
 console.log(name);
 var filepath = req.body.filename2;
 console.log(filepath);
  bcrypt.hash(filepath, saltRounds).then(hash => {
var hashedPassword = hash;

 var sql = "UPDATE userinfo SET password = ? WHERE name= ?"
    con.query(sql, [hashedPassword,name], (err, rows, fields)=> {
        if (!err){
            console.log('Updated successfully');
             res.send({ success: true, message: "ACCOUNT CREATED"});
        }
        else
            console.log(err);
    })
}).catch(err => {
console.log("Error is: ", err)
});

    });
        

module.exports = signUpRouter;