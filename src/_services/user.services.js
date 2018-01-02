export const userService = {
    userLogin,
    userLogout,
    userRegister
};

function userLogin(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'userid':username, 'passwd':password })
    };

    return fetch('http://127.0.0.1:5000/user/login', requestOptions)
        .then(response => {
            console.log(response);
            if (!response.ok) {
                return Promise.reject(response.message);
            }
            return response.json();
        })
        .then(user => {
            // login successful if there's a jwt token in the response
            if (user && user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });
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