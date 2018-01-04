import { userConstants } from '../_constants';

let user = JSON.parse(localStorage.getItem('user'));
const initialLoginState = user ? { loggedIn: true, user } :
                            {user: {},
                            loggedIn: false,
                            loggingIn: false,
                            loginFailed: false
                            };

const initialRegisterState = {
                                registering: false,
                                registered: false,
                                registerFailed: false
                            };

export function authentication(state = initialLoginState, action) {
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
            return state;
    }
}

export function userRegister(state = initialRegisterState, action) {
    switch (action.type) {
        case userConstants.REGISTER_REQUEST:
            return {
                registering: true,
                registered: false,
                registerFailed: false
            };
        case userConstants.REGISTER_SUCCESS:
            return {
                registering: false,
                registered: true,
                registerFailed: false
            };
        case userConstants.REGISTER_FAILURE:
            return {
                registering: false,
                registered: false,
                registerFailed: true
            };
        default:
            return state;
    }
}
