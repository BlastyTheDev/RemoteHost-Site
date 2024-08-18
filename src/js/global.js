export const URL = 'http://localhost:8080/';

export function getRememberMe() {
    return localStorage.getItem('rememberMe') === 'true';
}

export function setRememberMe(value) {
    if (value)
        localStorage.setItem('rememberMe', 'true');
    else
        localStorage.removeItem('rememberMe');
}
