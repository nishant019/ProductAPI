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
app.get('/featureManagement/addFeatures', requireLogin, (req, res) => {

  res.sendFile(path.join(__dirname, '/views/featureManagement/addFeatures.html'));

});
app.get('/featureManagement/listFeatures', requireLogin, (req, res) => {

  res.sendFile(path.join(__dirname, '/views/featureManagement/listFeatures.html'));

});
app.get('/featureManagement/getFeatureDetail', requireLogin, (req, res) => {

  res.sendFile(path.join(__dirname, '/views/featureManagement/getFeatureDetail.html'));

});
app.get('/additionalFieldManagement/additionalField', requireLogin, (req, res) => {

  res.sendFile(path.join(__dirname, '/views/Additional Fields Management/additionalField.html'));

});
app.get('/additionalFieldManagement/mapAdditionalField', requireLogin, (req, res) => {

  res.sendFile(path.join(__dirname, '/views/Additional Fields Management/mapAdditionalField.html'));

});

app.get('/additionalFieldManagement/childAdditionalField', requireLogin, (req, res) => {

  res.sendFile(path.join(__dirname, '/views/Additional Fields Management/Child Additional Fields Management/childAdditionalField.html'));

});



app.get('/customer/getProds',  (req, res) => {

  res.sendFile(path.join(__dirname, '/views/Customer Management/dashboard.html'));

});

app.get('/customer/product/detail',  (req, res) => {

  res.sendFile(path.join(__dirname, '/views/Customer Management/productDetail.html'));

});

app.get('/customer/product/list',  (req, res) => {

  res.sendFile(path.join(__dirname, '/views/Customer Management/productList.html'));

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
app.get('/featureMgmt.js', (req, res) => {
  res.sendFile(path.join(__dirname, '/scripts/featureMgmt.js'));
});
app.get('/Customer_Management/scripts.js', (req, res) => {
  res.sendFile(path.join(__dirname, '/scripts/Customer Management/scripts.js'));
});

app.get('/pagination.css', (req, res) => {
  res.sendFile(path.join(__dirname, '/styles/pagination.css'));

});
app.get('/adminIcon', (req, res) => {
  res.sendFile(path.join(__dirname, '/styles/icons/admin.png'));
});
app.get('/bookmark', (req, res) => {
  res.sendFile(path.join(__dirname, '/styles/icons/bookmark.svg'));
});
app.get('/bookmarked', (req, res) => {
  res.sendFile(path.join(__dirname, '/styles/icons/bookmarked.svg'));
});
app.get('/logo', (req, res) => {
  res.sendFile(path.join(__dirname, '/styles/icons/logo.svg'));
});
app.get('/cart', (req, res) => {
  res.sendFile(path.join(__dirname, '/styles/icons/cart.svg'));
});

app.get('/menuIcon', (req, res) => {
  res.sendFile(path.join(__dirname, '/styles/icons/menu.svg'));
});
app.get('/banner', (req, res) => {
  res.sendFile(path.join(__dirname, '/styles/icons/banner.jpg'));
});

app.get('/profile.css', (req, res) => {
  res.sendFile(path.join(__dirname, '/styles/profile.css'));
});

app.get('/mainStyle.css', (req, res) => {
  res.sendFile(path.join(__dirname, '/styles/mainStyle.css'));
});

app.get('/customer/main.css', (req, res) => {
  res.sendFile(path.join(__dirname, '/styles/customer/main.css'));
});

app.get('/customer/productlist.css', (req, res) => {
  res.sendFile(path.join(__dirname, '/styles/customer/productlist.css'));
});
app.get('/customer/dashboard.css', (req, res) => {
  res.sendFile(path.join(__dirname, '/styles/customer/dashboard.css'));
});



const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log('Server listening on port ' + port);
});

module.exports = app;
