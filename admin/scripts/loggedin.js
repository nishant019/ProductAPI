const errorMsg = document.getElementById('error');
const login = document.getElementById('loginForm');
const profile = document.getElementById('profile');
const success = document.getElementById('success');
const loggedInUser = localStorage.getItem("loggedInUser");
const headers = {
  'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`,
  'loggedinuser': loggedInUser,
  'Content-Type': 'application/json',
};

let currentPage = 1;
let maxPages;

var productInfoStates = [];
var userInfoStates = [];
var currentIndex = -1;

const user = { "loggedInUser": loggedInUser };
const getUserDetailsURL = `http://localhost:3000/getUserDetails`;
const changePassswordURL = `http://localhost:3000/changePassword`;
const getUsersURL = `http://localhost:3000/getAdminUsers`;
const getProdsUrl = `http://localhost:3000/getProds`;
const addUserUrl = `http://localhost:3000/addUsers`;
const updateUserUrl = `http://localhost:3000/updateUser/`;
const deleteUserURL = `http://localhost:3000/deleteUser/`;
const deleteProductUrl = `http://localhost:3000/deleteProd/`
const updateUserInfoUrl = `http://localhost:3000/manageUserInfo/`;
const updateProdsUrl = `http://localhost:3000/updateProds/`
const addProductUrl = `http://localhost:3000/addProds`
const uploadImageUrl = `http://localhost:3000/uploadImage/`

const deleteImageUrl = `http://localhost:3000/deleteImage/`
const getProdUrl = 'http://localhost:3000/getProds/'
const getImageUrl = 'http://localhost:3000/prodImage/'


