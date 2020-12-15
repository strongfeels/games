import axios from 'axios';
import {
    register_success,
    register_fail,
    login_success,
    login_fail,
    load_user,
    auth_error,
    log_out
} from '../constants/constants.js';
import { setToken } from '../setToken';

export const loadUser = () => async dispatch => {
    if(localStorage.getItem('token'))
        setToken(localStorage.getItem('token'));
    try {

        const response = await axios.get('http://localhost:5000/api/users');

        dispatch({
            type: load_user,
            payload: response.data
        });

     } catch (error) {
        dispatch({ type: auth_error, payload: error });
    }
}

export const registerUser = (email,password) => async dispatch => {
    try {

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const body = JSON.stringify({ email,password });

        const response = await axios.post('http://localhost:5000/api/users/register',body,config);

        dispatch({
            type: register_success,
            payload: response.data
        });

        dispatch(loadUser());

    } catch (error) {
        dispatch({ type: register_fail, payload: error });
    } 
}

export const loginUser = (email,password) => async dispatch => {
    try {

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const body = JSON.stringify({ email,password });

        const response = await axios.post('http://localhost:5000/api/users/login',body,config);

        dispatch({
            type: login_success,
            payload: response.data
        })

        dispatch(loadUser());

    } catch (error) {
        dispatch({ type: login_fail, payload: error });
    }
}

export const logOut = () => async dispatch => {
    dispatch({
        type: log_out
    });
}