//get admin user info[own]
function getUserDetails() {
    axios({
        method: 'get',
        url: `${getUserDetailsURL}`,
        headers: headers
    }).then((response) => {
        // console.log('response', (response.data.users[0].userId))
        const userId = response.data.users[0].userId;
        const email = response.data.users[0].email;
        const userName = response.data.users[0].userName;
        const role = response.data.users[0].role;
        const fullName = response.data.users[0].fullName;

        document.getElementById('userId').textContent = userId
        document.getElementById('email').textContent = email
        document.getElementById('userName').textContent = userName
        document.getElementById('role').textContent = role
        document.getElementById('fullName').textContent = fullName

        // profile.innerText = JSON.stringify(response.data, undefined, 4);

        document.getElementById('edit').addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = `/manageUserInfo?userId=${userId}&email=${email}&userName=${userName}&role=${role}&fullName=${fullName}`;
        });
    })
        .catch((error) => {
            console.error('Error:', error);
        });
}

//update admin user info[own]
function updateOwnInfo(data) {
    const loco = new URL(window.location.href);
    const userId = loco.searchParams.get("userId");
    axios({
        method: 'put',
        url: `${updateUserInfoUrl + userId}`,
        data: JSON.stringify(data),
        headers: headers
    }).then((response) => {
        localStorage.setItem("loggedInUser", userId);

        success.innerText = JSON.stringify(response.data, undefined, 4);
        success.style.color = 'green';
        success.innerHTML = response.data.message;
        setTimeout(() => {
            success.style.color = 'black';
            success.innerHTML = '';
            window.location.href = '/profile';
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

//change admin user pwd[own]
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

