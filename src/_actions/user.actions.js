import { userConstants } from '../_constants';
import { userService } from '../_services';

export const userAction = {
    userLogin,
    userLogout,
    userRegister
};

function userLogin(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        userService.userLogin(username, password)
            .then(
                status => {
                    console.log('success');
                    console.log(status);
                    dispatch(success({'user': username}));
                    window.location = '#/';
                },
                error => {
                    console.log('failed');
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
    userService.userLogout();
    return { type: userConstants.LOGOUT };
}

function userRegister(user) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user => {
                    dispatch(success());
                    //history.push('/login');
                    //dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error));
                    //dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}