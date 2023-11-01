
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

const user = { "loggedInUser": loggedInUser }
const getUserDetailsURL = `http://localhost:3000/getUserDetails`
const changePassswordURL = `http://localhost:3000/changePassword`
const getUsersURL = `http://localhost:3000/getUsers`
const addUserUrl = `http://localhost:3000/addUsers`
const updateUserUrl = `http://localhost:3000/updateUser/`
const deleteUserURL = `http://localhost:3000/deleteUser/`


function getUserDetails() {
  axios({
    method: 'get',
    url: `${getUserDetailsURL}`,
    headers: headers
  }).then((response) => {
    console.log('response', JSON.stringify(response.data))
    profile.innerText = JSON.stringify(response.data, undefined, 4);

  })
    .catch((error) => {
      console.error('Error:', error);
    });
}
function getUsers() {
  axios({
    method: 'get',
    url: `${getUsersURL}`,
    headers: headers
  }).then((response) => {
    const tableData = JSON.parse(JSON.stringify(response.data))
    console.log(tableData)
    const table = document.getElementById("userTable");
    const tbody = table.querySelector("tbody");

    tableData.users.forEach(user => {
      const row = document.createElement("tr");
      row.innerHTML = `
            <td>${user.id}</td>
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
  if(window.confirm("Are you sure you want to delete this user??")){
    deleteUser(userId)
    window.location.reload()
    window.alert("User is deleted!")

  }else{
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