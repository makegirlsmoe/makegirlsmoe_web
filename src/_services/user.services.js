export const userService = {
    userLogin,
    userLogout,
    userRegister
};

function userLogin() {

}

function userLogout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function userRegister(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch('/user/signup', requestOptions).then(handleResponse);
}

function handleResponse(response) {
    if (!response.ok) {
        return Promise.reject(response.statusText);
    }

    return response.json();
}