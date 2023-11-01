const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs')
const axios = require('axios');

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')



app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));
const requireLogin = (req, res, next) => {
  if (req.cookies.jwtToken) {
    next();
  } else {
    res.redirect('/login');
  }
}

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '/Login.html'));
});


app.get('/profile', requireLogin,(req, res) => {

  res.sendFile(path.join(__dirname, '/Profile.html'));

});

app.get('/changePassword', requireLogin, (req, res) => {

  res.sendFile(path.join(__dirname, '/changePassword.html'));

});
app.get('/addUser', requireLogin, (req, res) => {

  res.sendFile(path.join(__dirname, '/addUser.html'));

});

app.get('/menu', requireLogin, (req, res) => {

  res.sendFile(path.join(__dirname, '/menu.html'));

})
app.get('/updateUser', requireLogin, (req, res) => {

  res.sendFile(path.join(__dirname, '/updateUser.html'));

})

app.get('/getUsers', requireLogin, (req, res) => {

  res.sendFile(path.join(__dirname, '/getUsers.html'));

})

app.get('/scr.js', (req, res) => {
  res.sendFile(path.join(__dirname, '/scripts/scr.js'));

});
app.get('/loggedin.js', (req, res) => {
  res.sendFile(path.join(__dirname, '/scripts/loggedin.js'));

});
app.get('/menu.js', (req, res) => {
  res.sendFile(path.join(__dirname, '/scripts/menu.js'));

});



const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log('Server listening on port ' + port);
});

module.exports = app;
