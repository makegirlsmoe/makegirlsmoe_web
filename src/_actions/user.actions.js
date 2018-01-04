import { userConstants } from '../_constants';
import { userService } from '../_services';

export const userAction = {
    userLogin,
    userLogout,
    userRegister,
    addResultToFavorite,
    queryLibrary
};

function userLogin(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        userService.userLogin(username, password)
            .then(
                status => {
                    console.log(status);
                    dispatch(success({'user': username}));
                    window.location = '#/';
                },
                error => {
                    console.log(error);
                    dispatch(failure(error));
                    //dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function userLogout() {
    return dispatch => {
        userService.userLogout()
            .then(
                status => dispatch(success())
            );
    };
    function success() { console.log('success');return { type: userConstants.LOGOUT} }
}

function userRegister(username, password) {
    return dispatch => {
        dispatch(request(username));

        userService.userRegister(username, password)
            .then(
                status => {
                    console.log(status);
                    dispatch(success(username));
                    window.location = '#/login';
                    //history.push('/login');
                    //dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    console.log(error);
                    dispatch(failure(error));
                    //dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function addResultToFavorite(data) {
    return dispatch => {
        dispatch(request());
        userService.addResultToFavorite(data)
            .then(
                status => {
                    console.log(status);
                    dispatch(success());
                },
                error => {
                    console.log(error);
                    dispatch(failure(error));
                    //dispatch(alertActions.error(error));
                }
            );
    };
    function request() { return { type: userConstants.ADD_FAVORITE_REQUEST } }
    function success() { return { type: userConstants.ADD_FAVORITE_SUCCESS } }
    function failure(error) { return { type: userConstants.ADD_FAVORITE_FAILURE, error } }
}

function queryLibrary() {
    return dispatch => {
        dispatch(request());
        userService.queryLibrary()
            .then(
                body => {
                    console.log(body);
                    dispatch(success(body));
                },
                error => {
                    console.log(error);
                    dispatch(failure(error));
                    //dispatch(alertActions.error(error));
                }
            );
    };
    function request() { return { type: userConstants.QUERY_LIBRARY_REQUEST } }
    function success(data) { return { type: userConstants.QUERY_LIBRARY_SUCCESS, data } }
    function failure(error) { return { type: userConstants.QUERY_LIBRARY_FAILURE, error } }
}