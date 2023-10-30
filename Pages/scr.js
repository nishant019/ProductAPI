
const error = document.getElementById('error')
const login = document.getElementById('loginForm')
const profile = document.getElementById('profile')
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
        sessionStorage.setItem("loggedInUser", userName);
        sessionStorage.setItem("jwtToken", jwtToken);
        profile.innerText = sessionStorage.getItem("jwtToken");
        console.log(sessionStorage.getItem("jwtToken"))
    }).catch(e => {
        const errorMessage = JSON.parse(JSON.stringify(e.response.data)).error
        error.style.color = 'red'
        error.innerHTML = errorMessage
        setTimeout(() => {
            error.style.color = 'black';
            error.innerHTML = '';
        }, 3000);

    }).finally(e => {

    });
})
//         if (response.status === 200) {
//             res.json({ message: 'Login successful', data: response.data });
//         } else {
//             res.status(response.status).json({ message: 'Unexpected response', data: response.data });
//         }
//     } catch (error) {
//         if (error.response) {
//             // The request was made, but the server responded with an error status code
//             errorMessage = `Request failed with status ${error.response.status}`;
//         } else if (error.request) {
//             // The request was made but no response was received
//             errorMessage = 'No response received from the server';
//         } else {
//             // Something else went wrong
//             errorMessage = error.message;
//         }
//         error.innerText = errorMessage

//         // res.status(500).json({ message: errorMessage, data: JSON.parse(JSON.stringify(error.response.data)) });
//     }
// });

// axios.post('/login', async (req, res) => {

// axios.post(apiUrl, { username, password }, { headers })



// });

