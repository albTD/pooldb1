const express = require('express');
const bodyparser = require('body-parser');
const mailRouter = express.Router();
require('dotenv').config();

mailRouter.use(bodyparser.json());
const mysql = require('mysql');
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "thinkdigital",
    database: "poolapp"
});


mailRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        next();
    });

 
mailRouter.route('/sendmail')
    .post((req, res) => {

const nodemailer = require('nodemailer');
let transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.EMAIL,
        pass:process.env.PASSWORD
    }
});

let mailOptions={
  from:'vdbombay70@gmail.com',
  to:req.body.un,
  subject:'Account recovering details',
  text:'The OTP is:'+req.body.us  

};

transporter.sendMail(mailOptions,function(err,data){
    if(err){
        console.log('Error Occurs'+ err);
    }
    else{
        console.log('Email sent!!!');
    }
});
    });


    module.exports = mailRouter;