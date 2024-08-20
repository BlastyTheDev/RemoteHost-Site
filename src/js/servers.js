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
});
