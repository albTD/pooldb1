//necessary nodeModules
const express = require('express');
const mysql = require('mysql');
const bodyparser = require('body-parser');
const cors = require('cors'); //for http permissions

const app = express();
app.use(cors());
console.log(__dirname);
app.use('/',express.static(__dirname + '/uploads'));
app.use('/',express.static(__dirname + '/uploads1'));
app.use('/signup', require('./signUp'));                   //signUp router
app.use('/userAuth', require('./login'));                 //login router
app.use('/user', require('./user'));                     //current user details, posts
app.use('/exchange', require('./exchange'));            //router for  post(create and read) of echange
app.use('/pools', require('./pools'));                 //to create and read post of pools
app.use('/search', require('./searchQuery'));    //router for search bar
app.use('/mail', require('./mail'));

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
  extended: false
}));


//creating server connection
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "thinkdigital",
  database: "poolapp"
});

//getting an html file from same folder to check if is server is running
app.get('/', (req, res) => {
  res.sendFile(__dirname + "/" + "demo.html");
});

//read all users
app.get('/readUsers', (req, res) => {
  var query = "SELECT * FROM userinfo";
  con.query(query, (err, results) => {
    if (err) res.send(err);
    else {
      res.send(results);
    }
  });
});


//--------------------------------------------------------------------------------------------------------------
//to read chats of a user from different groups
app.post('/groupNames', (req, res) => {
  var userid = req.body.userId;
  query = 'SELECT * FROM chatList WHERE userId = "' + userid + '" ';
  con.query(query, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      //  console.log("GROUP NAMES SENT");
      res.send(results);
    }
  })
});

//reading messages of a particular group
app.post('/readChat', (req, res) => {
  var postid = req.body.postid;
  var postname = req.body.title;
  query = 'SELECT * FROM `' + postname + '` ';
  con.query(query, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      //console.log("GROUP MESSAGES SENT");
      res.send(results);
    }
  })
})

//--------------------------------------------------------------------------------------------------------------
var port = process.env.PORT || 6001;
var server = app.listen(port, () => {
  console.log(`Listening on ${port}`);
});