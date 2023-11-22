
const error = document.getElementById('error')
const login = document.getElementById('loginForm')
const profile = document.getElementById('profile')

if (document.cookie === '') {
    localStorage.clear()
}

const headers = {
    'Authorization': 'Basic YWRtaW46cGFzc3dvcmQ=',
    'Content-Type': 'application/json',
};
const apiUrl = 'http://localhost:3000/login'

login.addEventListener('submit', async (e) => {
    e.preventDefault();
    const userName = document.getElementById('userName').value
    const password = document.getElementById('password').value
    const user = { "userName": userName, "password": password }

    axios({
        method: 'post',
        url: `${apiUrl}`,
        data: JSON.stringify(user),
        headers: headers
    }).then(r => {
        const jwtToken = r.data.token; // Replace with your actual JWT
        window.location.href = '/profile';
        localStorage.setItem("loggedInUser", r.data.user);
        localStorage.setItem("jwtToken", jwtToken);
        const expirationDate = new Date();
        expirationDate.setTime(expirationDate.getTime() + 60 * 60 * 1000); // 1 hour
        document.cookie = `jwtToken=${jwtToken}; expires=${expirationDate.toUTCString()}; path=/`;

        profile.innerText = jwtToken;
        console.log(jwtToken);

    }).catch(e => {
        const errorMessage = JSON.parse(JSON.stringify(e.response.data)).error
        error.style.color = 'red'
        error.innerHTML = errorMessage
        setTimeout(() => {
            error.style.color = 'black';
            error.innerHTML = '';
        }, 3000);

    })
})
