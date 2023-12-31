const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs')
const axios = require('axios');
// const localStorage = require('loca')
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
//profile
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/profile/Login.html'));
});


app.get('/profile', requireLogin, (req, res) => {

  res.sendFile(path.join(__dirname, '/views/profile/Profile.html'));

});
app.get('/manageUserInfo', requireLogin, (req, res) => {

  res.sendFile(path.join(__dirname, '/views/profile/manageUserInfo.html'));

})

app.get('/changePassword', requireLogin, (req, res) => {

  res.sendFile(path.join(__dirname, '/views/profile/changePassword.html'));

});
//user management
app.get('/userManagement/addUser', requireLogin, (req, res) => {

  res.sendFile(path.join(__dirname, '/views/userManagement/addUser.html'));

});

app.get('/userManagement/updateUser', requireLogin, (req, res) => {

  res.sendFile(path.join(__dirname, '/views/userManagement/updateUser.html'));

})
app.get('/userManagement/getUsers', requireLogin, (req, res) => {

  res.sendFile(path.join(__dirname, '/views/userManagement/getUsers.html'));

})
//menu
app.get('/menu', requireLogin, (req, res) => {

  res.sendFile(path.join(__dirname, '/views/navs/menu.html'));

})
//product management

app.get('/productManagement/getProds', requireLogin, (req, res) => {

  res.sendFile(path.join(__dirname, '/views/productManagement/getProds.html'));

})
app.get('/productManagement/addProds', requireLogin, (req, res) => {

  res.sendFile(path.join(__dirname, '/views/productManagement/addProds.html'));

});
app.get('/productManagement/updateProds', requireLogin, (req, res) => {

  res.sendFile(path.join(__dirname, '/views/productManagement/updateProds.html'));

});


app.get('/productManagement/getProdDetail', requireLogin, (req, res) => {

  res.sendFile(path.join(__dirname, '/views/productManagement/getProdDetail.html'));

});

app.get('/productManagement/addProdType', requireLogin, (req, res) => {

  res.sendFile(path.join(__dirname, '/views/categoryManagement/productType/addProdType.html'));

});

app.get('/productManagement/addCategory', requireLogin, (req, res) => {

  res.sendFile(path.join(__dirname, '/views/categoryManagement/category/addCategory.html'));

});
app.get('/productManagement/addSubCategory', requireLogin, (req, res) => {

  res.sendFile(path.join(__dirname, '/views/categoryManagement/subCategory/addSubCategory.html'));

});

//scripts
app.get('/pagination.js', (req, res) => {
  res.sendFile(path.join(__dirname, '/scripts/pagination.js'));

});

app.get('/categoryMgmt.js', (req, res) => {
  res.sendFile(path.join(__dirname, '/scripts/categoryMgmt.js'));

});

app.get('/scr.js', (req, res) => {
  res.sendFile(path.join(__dirname, '/scripts/scr.js'));

});
app.get('/loggedin.js', (req, res) => {
  res.sendFile(path.join(__dirname, '/scripts/loggedin.js'));

});
app.get('/profile.js', (req, res) => {
  res.sendFile(path.join(__dirname, '/scripts/profile.js'));

});
app.get('/userMgmt.js', (req, res) => {
  res.sendFile(path.join(__dirname, '/scripts/userMgmt.js'));

});
app.get('/prodMgmt.js', (req, res) => {
  res.sendFile(path.join(__dirname, '/scripts/prodMgmt.js'));

});
app.get('/menu.js', (req, res) => {
  res.sendFile(path.join(__dirname, '/scripts/menu.js'));

});
app.get('/pagination.css', (req, res) => {
  res.sendFile(path.join(__dirname, '/styles/pagination.css'));

});
app.get('/adminIcon', (req, res) => {
  res.sendFile(path.join(__dirname, '/styles/icons/admin.png'));

});
app.get('/profile.css', (req, res) => {
  res.sendFile(path.join(__dirname, '/styles/profile.css'));

});
app.get('/mainStyle.css', (req, res) => {
  res.sendFile(path.join(__dirname, '/styles/mainStyle.css'));

});



const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log('Server listening on port ' + port);
});

module.exports = app;
