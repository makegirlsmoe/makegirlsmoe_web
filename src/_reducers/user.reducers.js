import { userConstants } from '../_constants';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } :
                            {user: {},
                            loggedIn: false,
                            loggingIn: false,
                            loginFailed: false
                            };

export function authentication(state = initialState, action) {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return {
                loggingIn: true,
                loggedIn: false,
                loginFailed: false,
                user: action.user
            };
        case userConstants.LOGIN_SUCCESS:
            //console.log(action);
            return {
                loggingIn: false,
                loggedIn: true,
                loginFailed: false,
                user: action.user
            };
        case userConstants.LOGIN_FAILURE:
            return {
                loggingIn: false,
                loggedIn: false,
                loginFailed: true,
                user: {}
            };
        case userConstants.LOGOUT:
            return {
                user: {},
                loggedIn: false,
                loggingIn: false,
                loginFailed: false
            };
        default:
            return state
    }
}

