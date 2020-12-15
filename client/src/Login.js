import React, { useState } from 'react'
import { loginUser } from './action/authAction';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const Login = ({ loginUser, LoginAccess}) => {

    let [data,setData] = useState({
        email: '',
        password: ''
    });

    if (LoginAccess) return <Redirect to ="/"/>

        let { email,password } = data;

        const onChange = e => {
            setData({ ...data,[e.target.name]: e.target.value });
        }
        
        const submitForm = () => {
            loginUser(email,password);
        }

    return (
        <div>
            <h1>Login</h1>
        <label>Email</label>
        <br/>
        <input onChange={(e) => onChange(e)} value ={ email } name="email" type="email"/>
        <br/>
        <label>Password</label>
        <br/>
        <input onChange={(e) => onChange(e)} value ={ password } name="password" type="password"/>
        <br/>
        <button onClick={() => submitForm}>
            Submit
        </button>
        </div>
    )
}

const mapStateToProps = state => ({
    LoginAccess: state.LoginAccess
});

export default connect(mapStateToProps, { loginUser })(Login);