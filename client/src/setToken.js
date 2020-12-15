import axios from 'axios'

export const setToken = async(token) => {
    if(token) axios.deafaults.headers.common['x-auth-token'] = token;
    else delete axios.deafaults.headers.common['x-auth-token']
}