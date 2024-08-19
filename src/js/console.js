const consoleWindow = document.getElementById('console-window');
const consoleInput = document.getElementById('console-input');
const sendButton = document.getElementById('send-button');

sendButton.addEventListener('click', () => {
    const command = consoleInput.value;
    consoleInput.value = '';
    consoleWindow.innerHTML += `<p>${command}</p>`;
});
