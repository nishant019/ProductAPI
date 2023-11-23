//update admin user
function updateUser(data) {
    const loco = new URL(window.location.href);
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
        }, 3000);
        window.location.href = new URL(document.referrer).origin + "/userManagement/getUsers";
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
//get admin user
function getUsers(currentPage) {

    axios.get(`${getUsersURL}${'/:id'}?page=${currentPage}`, { headers })
        .then((response) => {
            const tableData = response.data;
            const table = document.getElementById("userTable");
            const tbody = table.querySelector("tbody");
            tbody.innerHTML = '';

            tableData.users.forEach((user, index) => {
                const row = document.createElement("tr");
                const page = (currentPage === 1) ? index : index + (currentPage - 1) * 10;
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

            document.getElementById("userCount").innerHTML = tableData.totalData;
            document.getElementById("pageCount").innerHTML = tableData.totalPages;
            document.getElementById("pageNumber").innerHTML = tableData.currentPage;
            createPagination(tableData.totalPages, tableData.currentPage);
            maxPages = tableData.totalPages;

            const editButtons = document.querySelectorAll(".edit-button");
            const deleteButtons = document.querySelectorAll(".delete-button");

            deleteButtons.forEach((button, index) => {
                button.addEventListener("click", (e) => {
                    e.preventDefault();
                    const userId = tableData.users[index].userId;
                    deleteUserTable(userId);
                });
            });

            editButtons.forEach((button, index) => {
                button.addEventListener("click", (e) => {
                    e.preventDefault();
                    const userId = tableData.users[index].userId;
                    openUserUpdatePage(userId, tableData.users[index]);
                });
            });

            const url = `/userManagement/getUsers?page=${currentPage}`;
            historyListState(currentPage, url, userInfoStates, "userPageState");
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}
//delete admin user
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
            window.location.href = '/userManagement/getUsers';
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

//opens user's update page for updateUser
function openUserUpdatePage(userData, tableData) {
    const userName = tableData.userName;
    const email = tableData.email;
    const role = tableData.role;
    const status = tableData.status;
    const fullName = tableData.fullName;
    window.location.href = `/userManagement/updateUser?userId=${userData}&email=${email}&userName=${userName}&role=${role}&status=${status}&fullName=${fullName}`;
}
//delete alert and initiation deleteUser
function deleteUserTable(userId) {
    if (window.confirm("Are you sure you want to delete this user??")) {
        deleteUser(userId);
        window.location.reload();
        window.alert("User is deleted!");
    } else {
        window.location.href = '/userManagement/getUsers';
    }
}

//adds new admin user
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
