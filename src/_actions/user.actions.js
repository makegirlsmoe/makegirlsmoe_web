import { userConstants } from '../_constants';
import { userService } from '../_services';
import history from '../_helpers/history';
//import { browserHistory } from 'react-router'

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
                user => {
                    console.log('success');
                    console.log(user);
                    dispatch(success(user));
                    //this.props.history.push('/');
                    //browserHistory.push('/');
                    history.push('/');
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