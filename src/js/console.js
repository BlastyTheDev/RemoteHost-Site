import { URL } from './global.js';

const consoleWindow = document.getElementById('console-window');
const consoleInput = document.getElementById('console-input');
const sendButton = document.getElementById('send-button');

const socket = new WebSocket('ws://localhost:8080/api/v1/ws/minecraft/console');

socket.onopen = () => {
    console.log('WebSocket connection established');
    socket.send("::set-server 1");
}

socket.onmessage = (e) => {
    consoleWindow.value += e.data + '\n';
    // need to make it so the auto scroll doesnt happen if user is scrolling up
    consoleWindow.scrollTop = consoleWindow.scrollHeight;
}

function sendCommand() {
    const command = consoleInput.value;
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

consoleInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter')
        sendCommand();
});
