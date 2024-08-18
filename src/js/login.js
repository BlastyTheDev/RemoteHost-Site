const { URL, setRememberMe } = require("./global");

const usernameInput = document.getElementById('username-input');
const passwordInput = document.getElementById('password-input');
const rememberMe = document.getElementById('remember-me');
const loginButton = document.getElementById('login-button');

loginButton.addEventListener('click', () => {
    const username = usernameInput.value;
    const password = passwordInput.value;

    fetch(URL + 'api/v1/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "username": username,
            "password": password,
        })
    })
    .then(response => {
        if (response.ok) {
            // TODO: user logged in
        } else {
        }
    })
    .catch(error => {
        console.error(error);
    });
});

rememberMe.addEventListener('change', () => {
    setRememberMe(rememberMe.checked);
});
