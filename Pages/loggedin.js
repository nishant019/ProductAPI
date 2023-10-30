
const error = document.getElementById('error')
const login = document.getElementById('loginForm')
const profile = document.getElementById('profile')
const headers = {
    'Authorization': `Bearer ${sessionStorage.getItem("jwtToken")}`,
    'Content-Type': 'application/json',
};
const apiUrl = 'http://localhost:3000/getUserDetails'


const loggedInUser = sessionStorage.getItem("loggedInUser")
const user = { "loggedInUser": loggedInUser }

axios.get(apiUrl, {
    headers: headers,
    data: JSON.stringify(user), // Include the data in the query parameters for a GET request
  })
    .then((response) => {
      const jwtToken = response.data.token;
      console.log('Token:', jwtToken);
    })
    .catch((error) => {
      console.error('Error:', error);
    });


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

