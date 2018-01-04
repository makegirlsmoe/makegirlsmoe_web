export const userService = {
    userLogin,
    userLogout,
    userRegister,
    addResultToFavorite,
    queryLibrary,
};

function userLogin(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: "include",
        body: JSON.stringify({ 'userid':username, 'passwd':password })
    };

    return fetch('http://127.0.0.1:5000/user/login', requestOptions)
        .then(handleResponse)
        .then(handleStatue);
}

function userLogout() {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: "include"
    };
    return fetch('http://127.0.0.1:5000/user/logout', requestOptions)
        .then(handleResponse)
        .then(handleStatue);
}

function userRegister(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: "include",
        body: JSON.stringify({ 'userid':username, 'passwd':password })
    };

    return fetch('http://127.0.0.1:5000/user/signup', requestOptions)
        .then(handleResponse)
        .then(handleStatue);
}

function addResultToFavorite(data) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: "include",
        body: JSON.stringify({'data': data})
    };
    return fetch('http://127.0.0.1:5000/library/add', requestOptions)
        .then(handleResponse)
        .then(handleStatue);
}

function queryLibrary() {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: "include",
        body: JSON.stringify({ 'from':0, 'to':1000 })
    };
    return fetch('http://127.0.0.1:5000/library/query', requestOptions)
        .then(handleResponse)
}


function handleResponse(response) {
    if (!response.ok) {
        return Promise.reject(response.statusText);
    }
    console.log(response);
    //console.log(response.body.json());
    return response.json();
}

function handleStatue(status) {
    if (!status.ok) {
        return Promise.reject(status.message);
    }
    return status;
}