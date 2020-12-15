import {
    register_success,
    register_fail,
    login_success,
    login_fail,
    load_user,
    auth_error,
    log_out
} from './constants/constants.js'

const initialState = {
    token: localStorage.getItem('token'),
    LoginAccess: false,
    errors: {}
}

const authReducer = (state = initialState, action ) => {
    const { type,payload } = action;
    switch(type){
        case register_success:
        case login_success:
            localStorage.setItem('token',payload.token);
            return {
                ...state,
                LoginAccess: true
            }
        case login_fail:
        case register_fail:
        case auth_error:
            localStorage.removeItem('token');
            return {
                ...state,
                LoginAccess: false,
                errors: payload
            }
        case load_user:
            localStorage.getItem('token')
            return {
                ...state,
                LoginAccess: true
            }
        case log_out:
            localStorage.removeItem('token');
            return {
                ...state,
                LoginAccess: false
            }
        default:
            return state;
    }
}

export default authReducer;