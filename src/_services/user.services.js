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
        .then(

            status => {
                if (!status.ok){
                    return Promise.reject(status.message);
                }
            return status;
        });
}

function userLogout() {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: "include"
    };
    return fetch('http://127.0.0.1:5000/user/logout', requestOptions).then(response => {
        console.log(response);
        if (!response.ok) {
            return Promise.reject(response.message);
        }
        return response.json();
    })
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