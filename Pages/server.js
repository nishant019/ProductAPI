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
    localStorage.setItem("productPageState",'')
    localStorage.setItem("jwtToken",'')
    localStorage.setItem("userPageLoaded",'')
    localStorage.setItem("prodPageLoaded",'')
    localStorage.setItem("userPageState",'')
    res.redirect('/login');
  }
}

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '/profile/Login.html'));
});


app.get('/profile', requireLogin, (req, res) => {

  res.sendFile(path.join(__dirname, '/profile/Profile.html'));

});
app.get('/manageUserInfo', requireLogin, (req, res) => {

  res.sendFile(path.join(__dirname, '/profile/manageUserInfo.html'));

})

app.get('/changePassword', requireLogin, (req, res) => {

  res.sendFile(path.join(__dirname, '/profile/changePassword.html'));

});

app.get('/addUser', requireLogin, (req, res) => {

  res.sendFile(path.join(__dirname, '/userManagement/addUser.html'));

});

app.get('/updateUser', requireLogin, (req, res) => {

  res.sendFile(path.join(__dirname, '/userManagement/updateUser.html'));

})
app.get('/getUsers', requireLogin, (req, res) => {

  res.sendFile(path.join(__dirname, '/userManagement/getUsers.html'));

})

app.get('/menu', requireLogin, (req, res) => {

  res.sendFile(path.join(__dirname, '/navs/menu.html'));

})

app.get('/getProds', requireLogin, (req, res) => {

  res.sendFile(path.join(__dirname, '/productManagement/getProds.html'));

})
app.get('/addProds', requireLogin, (req, res) => {

  res.sendFile(path.join(__dirname, '/productManagement/addProds.html'));

});

app.get('/pagination.js', (req, res) => {
  res.sendFile(path.join(__dirname, '/scripts/pagination.js'));

});

app.get('/scr.js', (req, res) => {
  res.sendFile(path.join(__dirname, '/scripts/scr.js'));

});
app.get('/loggedin.js', (req, res) => {
  res.sendFile(path.join(__dirname, '/scripts/loggedin.js'));

});
app.get('/menu.js', (req, res) => {
  res.sendFile(path.join(__dirname, '/scripts/menu.js'));

});
app.get('/pagination.css', (req, res) => {
  res.sendFile(path.join(__dirname, '/styles/pagination.css'));

});



const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log('Server listening on port ' + port);
});

module.exports = app;
