const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs')
const axios = require('axios');

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')


app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));


app.get('/login', (req, res) => {

    res.sendFile(path.join(__dirname, '/Login.html'));
  

});

// app.post('/login', (req, res) => {
//   const username = req.body.userName;
//   const password = req.body.password;
//   console.log(res.cookie.token)
//   res.redirect('/profile')

// });

app.get('/profile', (req, res) => {


  res.sendFile(path.join(__dirname, '/Profile.html'));

});

app.get('/scr.js', (req, res) => {
  res.sendFile(path.join(__dirname, '/scr.js'));

});
app.get('/loggedin.js', (req, res) => {
  res.sendFile(path.join(__dirname, '/loggedin.js'));

});



const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log('Server listening on port ' + port);
});

module.exports = app;
