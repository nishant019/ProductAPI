document.addEventListener("DOMContentLoaded", function () {
    loadMenu();
});


function loadMenu() {
    fetch("/menu")
        .then(response => response.text())
        .then(data => {
            document.getElementById("menu").innerHTML = data;

            // After loading the menu, add the logout event listener
            const logoutButton = document.getElementById("logout");
            if (logoutButton) {
                logoutButton.addEventListener("click", handleLogout);
            }
        });
}

function handleLogout(e) {
    e.preventDefault();

    const headers = {
        'Authorization': `Bearer ${sessionStorage.getItem("jwtToken")}`,
        'loggedinuser': sessionStorage.getItem("loggedInUser"),
        'Content-Type': 'application/json',
    };

    // Send a POST request to the logout endpoint
    const logoutUrl = 'http://localhost:3000/logoutAdmin';
    document.cookie = 'jwtToken=;';

    axios({
        method: 'post',
        url: `${logoutUrl}`,
        headers: headers,
    })
        .then(function (response) {
            if (response.data.success) {
                // Redirect to the login page on successful logout
                alert(response.data.success);
                window.location.href = 'http://localhost:3001/login';
            } else {
                alert("Logout was not successful.");
            }
        })
        .catch(function (error) {
            alert("Error occurred during logout.");
        });

}

