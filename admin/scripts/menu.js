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
        'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`,
        'loggedinuser': localStorage.getItem("loggedInUser"),
        'Content-Type': 'application/json',
    };

    // Send a POST request to the logout endpoint
    const logoutUrl = 'http://localhost:3000/logoutAdmin';

    axios({
        method: 'post',
        url: `${logoutUrl}`,
        headers: headers,
    })
        .then(function (response) {
            if (response.data.success) {
                // Redirect to the login page on successful logout
                alert(response.data.success);
                document.cookie = 'jwtToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                localStorage.clear()

                window.location.href = 'http://localhost:3001/login';
            } else {
                alert("Logout was not successful.");
            }
        })
        .catch(function (error) {
            alert("Error occurred during logout.", error);
        });

}
function getPagePath(url) {
    const pathname = new URL(url).pathname;
    return pathname;
}
document.addEventListener('DOMContentLoaded', () => {
    const currentUrl = document.location
    console.log('currentUrl', currentUrl)

    if (!getPagePath(currentUrl).includes('userManagement')) {
        localStorage.setItem('userPageLoaded', '');
        // localStorage.setItem('userPageState', '[{"page":1}]');

    } else if (!getPagePath(currentUrl).includes('productManagement')) {
        localStorage.setItem('prodPageLoaded', '');
        // localStorage.setItem('prodPageState', '[{"page":1}]');

    }else {
        localStorage.setItem('userPageLoaded', '');
        // localStorage.setItem('userPageState', '[{"page":1}]');

        localStorage.setItem('prodPageLoaded', '');
        // localStorage.setItem('prodPageState', '[{"page":1}]');

    }
})

