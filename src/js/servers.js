import { URL } from './global.js';

const main = document.querySelector('main');

fetch(URL + 'api/v1/minecraft/get-owned-servers', {
    method: 'GET',
    credentials: 'include',
    headers: {
        'Content-Type': 'application/json'
    }
})
.then(response => {
    if (response.ok) {
        return response.json();
    } else {
        throw new Error('Failed to get servers');
    }
})
.then(data => {
    console.log(data);
    data.forEach(server => {
        const serverCard = document.createElement('div');
        serverCard.classList.add('inset-0', 'w-[32rem]', 'h-72', 'bg-bg-secondary', 'shadow-lg', 'shadow-bg-accent', 'mr-3', 'mb-3', 'rounded-xl');

        const serverImage = document.createElement('img');
        serverImage.classList.add('bg-bg-primary', 'w-32', 'h-32', 'm-3', 'rounded');
        serverImage.src = server.image;

        const serverDetails = document.createElement('div');
        serverDetails.classList.add('ml-[9.5rem]', 'mt-[-8.8rem]');

        const serverName = document.createElement('h1');
        serverName.classList.add('text-2xl');
        serverName.innerText = server.name;

        const serverAddress = document.createElement('h2');
        serverAddress.classList.add('text-lg', 'mb-3');
        serverAddress.innerText = server.address + ':' + server.port;

        const serverStatus = document.createElement('h2');
        serverStatus.classList.add('text-lg');
        serverStatus.innerText = server.status;

        const playersOnline = document.createElement('h3');
        playersOnline.classList.add('w-fit', 'indent-6');
        playersOnline.innerText = server.playersOnline + ' / ' + server.maxPlayers;

        const playerIcon = document.createElement('img');
        playerIcon.classList.add('w-4', 'h-4', 'mt-[-1.3rem]');
        playerIcon.src = '../resources/user-solid.svg';

        const actionButtons = document.createElement('div');
        actionButtons.classList.add('mt-28', 'mx-3');

        const startButton = document.createElement('img');
        startButton.classList.add('w-8', 'h-8', 'absolute', 'hover:cursor-pointer');
        startButton.src = '../resources/circle-play-solid.svg';

        const stopButton = document.createElement('img');
        stopButton.classList.add('w-8', 'h-8', 'absolute', 'ml-10', 'hover:cursor-pointer');
        stopButton.src = '../resources/circle-stop-solid.svg';

        const settingsButton = document.createElement('img');
        settingsButton.classList.add('w-[1.25rem]', 'h-[1.25rem]', 'mt-2', 'float-right', 'hover:cursor-pointer');
        settingsButton.src = '../resources/gear-solid.svg';

        serverDetails.appendChild(serverName);
        serverDetails.appendChild(serverAddress);
        serverDetails.appendChild(serverStatus);
        serverDetails.appendChild(playersOnline);
        serverDetails.appendChild(playerIcon);

        actionButtons.appendChild(startButton);
        actionButtons.appendChild(stopButton);
        actionButtons.appendChild(settingsButton);


        serverCard.appendChild(serverImage);
        serverCard.appendChild(serverDetails);
        serverCard.appendChild(actionButtons);

        main.appendChild(serverCard);
    })
});
