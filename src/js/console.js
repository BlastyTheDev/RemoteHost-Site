import { URL } from './global.js';

const consoleWindow = document.getElementById('console-window');
const consoleInput = document.getElementById('console-input');
const sendButton = document.getElementById('send-button');

const serverName = document.getElementById('server-name');

const socket = new WebSocket('ws://localhost:8080/api/v1/ws/minecraft/console');

socket.onopen = () => {
    console.log('WebSocket connection established');
    socket.send("::set-server 1");
}

socket.onmessage = (e) => {
    if (e.data.startsWith('::set-server ')) {
        let name = e.data.substring(13);
        serverName.innerText = name;
        return;
    }

    consoleWindow.value += e.data + '\n';
    // need to make it so the auto scroll doesnt happen if user is scrolling up
    consoleWindow.scrollTop = consoleWindow.scrollHeight;
}

function sendCommand() {
    const command = consoleInput.value;

    consoleWindow.value += '> ' + command + '\n';
    consoleWindow.scrollTop = consoleWindow.scrollHeight;

    consoleInput.value = '';
    
    // temp server id for debug
    fetch(URL + 'api/v1/minecraft/send-command?server=' + '1', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            command
        })
    })
    .catch(error => {
        console.error(error);
    });
}

sendButton.addEventListener('click', () => {
    sendCommand();
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
    if (e.key === 'Enter' && consoleInput.value.trim().length > 0) {
        sendCommand();

        sendButton.style.filter = 'brightness(30%)';
        sendButton.style.cursor = 'default';
    }
});
