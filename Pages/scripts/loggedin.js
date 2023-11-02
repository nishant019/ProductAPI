
const errorMsg = document.getElementById('error')
const login = document.getElementById('loginForm')
const profile = document.getElementById('profile')
const success = document.getElementById('success')
const loggedInUser = sessionStorage.getItem("loggedInUser")
const headers = {
  'Authorization': `Bearer ${sessionStorage.getItem("jwtToken")}`,
  'loggedinuser': loggedInUser,
  'Content-Type': 'application/json',
};
let currentPage = 1; // Current page number
let maxPages
const user = { "loggedInUser": loggedInUser }
const getUserDetailsURL = `http://localhost:3000/getUserDetails`
const changePassswordURL = `http://localhost:3000/changePassword`
const getUsersURL = `http://localhost:3000/getData`
const addUserUrl = `http://localhost:3000/addUsers`
const updateUserUrl = `http://localhost:3000/updateUser/`
const deleteUserURL = `http://localhost:3000/deleteUser/`
const updateUserInfoUrl = `http://localhost:3000/manageUserInfo/`

function updateOwnInfo(data) {
  const loco = new URL(window.location.href)
  const userId = loco.searchParams.get("userId");

  axios({
    method: 'put',
    url: `${updateUserInfoUrl + userId}`,
    data: JSON.stringify(data),
    headers: headers
  }).then((response) => {
    sessionStorage.setItem("loggedInUser", userId);

    success.innerText = JSON.stringify(response.data, undefined, 4);
    success.style.color = 'green';
    success.innerHTML = response.data.message;
    setTimeout(() => {

      success.style.color = 'black';
      success.innerHTML = '';
      window.location.href = '/profile'

    }, 3000);

  }).catch((error) => {
    const errorMessage = JSON.parse(JSON.stringify(error.response.data)).error;
    errorMsg.style.color = 'red';
    errorMsg.innerHTML = errorMessage;
    setTimeout(() => {
      errorMsg.style.color = 'black';
      errorMsg.innerHTML = '';
    }, 3000);
  });
}
function getUserDetails() {
  axios({
    method: 'get',
    url: `${getUserDetailsURL}`,
    headers: headers
  }).then((response) => {
    console.log('response', (response.data.users[0].userId))
    const userData = response.data.users[0].userId
    const email = response.data.users[0].email
    const userName = response.data.users[0].userName
    const role = response.data.users[0].role
    const fullName = response.data.users[0].fullName
    profile.innerText = JSON.stringify(response.data, undefined, 4);
    document.getElementById('edit').addEventListener('click', (e) => {
      e.preventDefault()
      window.location.href = `/manageUserInfo?userId=${userData}&email=${email}&userName=${userName}&role=${role}&fullName=${fullName}`;
    })
  })
    .catch((error) => {
      console.error('Error:', error);
    });
}

function getUsers() {
  axios({
    method: 'get',
    url: `${getUsersURL + "?page=" + currentPage}`,
    headers: headers
  }).then((response) => {
    const tableData = JSON.parse(JSON.stringify(response.data))
    const table = document.getElementById("userTable");
    const tbody = table.querySelector("tbody");
    tbody.innerHTML = ''; // Clear the existing rows
    const loadingIndicator = document.getElementById("loadingIndicator");
    loadingIndicator.style.display = "none";
    let page
    tableData.users.forEach((user, index) => {
      const row = document.createElement("tr");
      if (currentPage === 1) {
        page = index
      } else {
        page = index + (currentPage - 1) * 10
      }

      row.innerHTML = `
            <td>${page + 1}</td>
            <td>${user.userName}</td>
            <td>${user.email}</td>
            <td>${user.fullName}</td>
            <td>${user.userId}</td>
            <td>${user.status}</td>
            <td>${user.role}</td>
            <td>${user.createddate}</td>
            <td>${user.createdby}</td>
            <td>${user.updateddate}</td>
            <td>${user.updatedby}</td>
            <td><button class="edit-button">Edit</button></td>
            <td><button class="delete-button" style="color:red">Delete</button></td>
        `;
      tbody.appendChild(row);
    });
    document.getElementById("userCount").innerHTML = tableData.totalData
    document.getElementById("pageCount").innerHTML = tableData.totalPages
    document.getElementById("pageNumber").innerHTML = tableData.currentPage
    document.getElementById("pageDataCount").innerHTML = tableData.totalData

    maxPages = tableData.totalPages; // Maximum number of pages

    const editButtons = document.querySelectorAll(".edit-button");
    const deleteButtons = document.querySelectorAll(".delete-button");
    deleteButtons.forEach((button, index) => {
      button.addEventListener("click", (e) => {
        e.preventDefault()
        const userId = tableData.users[index].userId;

        deleteUserTable(userId);
      });
    })
    editButtons.forEach((button, index) => {
      button.addEventListener("click", () => {
        const userId = tableData.users[index].userId;
        openEditTab(userId, tableData.users[index]);
      });
    });
  })
    .catch((error) => {
      console.error('Error:', error);
    });
}

// Add event listeners for the "Previous Page" and "Next Page" buttons
document.getElementById("previousPage").addEventListener("click", (e) => {
  const loadingIndicator = document.getElementById("loadingIndicator");
  loadingIndicator.style.display = "block";
  if (currentPage > 1) {
    currentPage--; // Decrement the current page number

  }
  getUsers()
});

document.getElementById("nextPage").addEventListener("click", (e) => {
  const loadingIndicator = document.getElementById("loadingIndicator");
  loadingIndicator.style.display = "block";
  if (currentPage < maxPages) {
    currentPage++; // Increment the current page number

  }
  getUsers()

});

function changePassword(data) {
  axios({
    method: 'put',
    url: `${changePassswordURL}`,
    data: JSON.stringify(data),
    headers: headers
  }).then((response) => {
    profile.innerText = JSON.stringify(response.data, undefined, 4);
    profile.style.color = 'green';
    profile.innerHTML = response.data.message;
    setTimeout(() => {
      document.getElementById('oldPassword').value = '';
      document.getElementById('password').value = '';
      document.getElementById('confirmPassword').value = '';
      profile.style.color = 'black';
      profile.innerHTML = '';

    }, 3000);
  }).catch((error) => {
    const errorMessage = JSON.parse(JSON.stringify(error.response.data)).error;
    errorMsg.style.color = 'red';
    errorMsg.innerHTML = errorMessage;
    setTimeout(() => {
      errorMsg.style.color = 'black';
      errorMsg.innerHTML = '';
    }, 3000);
  });
}

function openEditTab(userData, tableData) {
  console.log(tableData.email)
  const userName = tableData.userName
  const email = tableData.email
  const role = tableData.role
  const status = tableData.status
  const fullName = tableData.fullName
  window.location.href = `/updateUser?userId=${userData}&email=${email}&userName=${userName}&role=${role}&status=${status}&fullName=${fullName}`;

  console.log("Opening edit tab for user with ID: " + userData);
}
function deleteUserTable(userId) {
  if (window.confirm("Are you sure you want to delete this user??")) {
    deleteUser(userId)
    window.location.reload()
    window.alert("User is deleted!")

  } else {
    window.location.href = '/getUsers'
  }
}

function addUser(data) {
  axios({
    method: 'post',
    url: `${addUserUrl}`,
    data: JSON.stringify(data),
    headers: headers
  }).then((response) => {
    success.innerText = JSON.stringify(response.data, undefined, 4);
    success.style.color = 'green';
    success.innerHTML = response.data.message;
    setTimeout(() => {
      document.getElementById('userName').value = '';
      document.getElementById('password').value = '';
      document.getElementById('email').value = '';
      document.getElementById('userRole').value = '';
      document.getElementById('fullName').value = '';
      document.getElementById('userStatus').value = '';

      success.style.color = 'black';
      success.innerHTML = '';

    }, 3000);
  }).catch((error) => {
    const errorMessage = JSON.parse(JSON.stringify(error.response.data)).error;
    errorMsg.style.color = 'red';
    errorMsg.innerHTML = errorMessage;
    setTimeout(() => {
      errorMsg.style.color = 'black';
      errorMsg.innerHTML = '';
    }, 3000);
  });
}

function updateUser(data) {
  const loco = new URL(window.location.href)
  const userId = loco.searchParams.get("userId");

  axios({
    method: 'put',
    url: `${updateUserUrl + userId}`,
    data: JSON.stringify(data),
    headers: headers
  }).then((response) => {
    success.innerText = JSON.stringify(response.data, undefined, 4);
    success.style.color = 'green';
    success.innerHTML = response.data.message;
    setTimeout(() => {
      document.getElementById('userName').value = '';
      document.getElementById('email').value = '';
      document.getElementById('userRole').value = '';
      document.getElementById('fullName').value = '';
      document.getElementById('userStatus').value = '';

      success.style.color = 'black';
      success.innerHTML = '';
      window.location.href = '/getUsers'
    }, 3000);
  }).catch((error) => {
    const errorMessage = JSON.parse(JSON.stringify(error.response.data)).error;
    errorMsg.style.color = 'red';
    errorMsg.innerHTML = errorMessage;
    setTimeout(() => {
      errorMsg.style.color = 'black';
      errorMsg.innerHTML = '';
    }, 3000);
  });
}

function deleteUser(userId) {
  axios({
    method: 'delete',
    url: `${deleteUserURL + userId}`,
    headers: headers
  }).then((response) => {
    alert.innerText = JSON.stringify(response.data, undefined, 4);
    success.style.color = 'green';
    window.alert = response.data.message;
    setTimeout(() => {
      success.style.color = 'black';
      success.innerHTML = '';
      window.location.href = '/getUsers'
    }, 3000);
  }).catch((error) => {
    const errorMessage = JSON.parse(JSON.stringify(error.response.data)).error;
    errorMsg.style.color = 'red';
    errorMsg.innerHTML = errorMessage;
    setTimeout(() => {
      errorMsg.style.color = 'black';
      errorMsg.innerHTML = '';
    }, 3000);
  });
}