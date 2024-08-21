import { URL } from './global.js';

const consoleWindow = document.getElementById('console-window');
const consoleInput = document.getElementById('console-input');
const sendButton = document.getElementById('send-button');

const serverName = document.getElementById('server-name');

const socket = new WebSocket('ws://localhost:8080/api/v1/ws/minecraft/console');

socket.onopen = () => {
    socket.send("::set-server 1");
}

socket.onmessage = (e) => {
    consoleWindow.value += e.data + '\n';
    // need to make it so the auto scroll doesnt happen if user is scrolling up
    consoleWindow.scrollTop = consoleWindow.scrollHeight;
}

fetch(URL + 'api/v1/minecraft/get-owned-servers', {
    method: 'GET',
    credentials: 'include',
    headers: {
        'Content-Type': 'application/json'
    }
})
.then(response => {
    if (response.ok)
        return response.json();
})
.then(data => {
    data.forEach(server => {
        const serverOption = document.createElement('option');
        serverOption.value = server.id;
        serverOption.innerText = server.name;

        serverName.appendChild(serverOption);
    });
});

function sendCommand(e) {
    if (e !== null)
        if (e.key !== 'Enter')
            return;

    if (consoleInput.value.trim().length <= 0)
        return;

    sendButton.style.filter = 'brightness(30%)';
    sendButton.style.cursor = 'default';

    const command = consoleInput.value;

    consoleWindow.value += '> ' + command + '\n';
    consoleWindow.scrollTop = consoleWindow.scrollHeight;

    consoleInput.value = '';
    
    // temp server id for debug
    fetch(URL + 'api/v1/minecraft/send-command?server=' + '1', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: command
    })
    .catch(error => {
        console.error(error);
    });
}

sendButton.addEventListener('click', () => {
    sendCommand(null);
});

sendButton.addEventListener('mouseover', () => {
    if (consoleInput.value.trim().length > 0)
        sendButton.style.filter = 'brightness(90%)';
});

sendButton.addEventListener('mouseout', () => {
    if (consoleInput.value.trim().length > 0)
        sendButton.style.filter = 'brightness(100%)';
});

consoleInput.addEventListener('input', () => {
    if (consoleInput.value.trim().length > 0) {
        sendButton.style.filter = 'brightness(100%)';
        sendButton.style.cursor = 'pointer';
    } else {
        sendButton.style.filter = 'brightness(30%)';
        sendButton.style.cursor = 'default';
    }
});

consoleInput.addEventListener('keydown', (e) => {
    sendCommand(e);
});

serverName.addEventListener('change', () => {
    console.log('change');
    socket.send('::set-server ' + serverName.value);
});
