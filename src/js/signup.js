const { URL } = require("./global");

const usernameInput = document.getElementById('username-input');
const discordInput = document.getElementById('discord-input');
const passwordInput = document.getElementById('password-input');
const rememberMe = document.getElementById('remember-me');
const signupButton = document.getElementById('signup-button');

signupButton.addEventListener('click', () => {
    const username = usernameInput.value;
    const discord = discordInput.value
    const password = passwordInput.value;

    fetch(URL + 'api/v1/auth/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "username": username,
            "password": password,
            "discord": discord,
        })
    })
    .then(response => {
        if (response.ok) {
            // TODO: user signed up
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
