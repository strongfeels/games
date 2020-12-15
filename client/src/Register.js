import React, { useState } from 'react';
import { registerUser } from './action/authAction';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const Register = ({ LoginAccess, registerUser }) => {

    let [data,setData] = useState({
        email: '',
        password: ''
      });   
    

    if (LoginAccess) return <Redirect to ='/'/>

        let { email,password } = data;
        
        const onChange = e => {
            setData({ ...data,[e.target.name]: e.target.value });
        }
        
        const submitForm = () => {
            if(email === '' && password === '') return alert("This field cannot be empty.")
            else registerUser(email,password);
        }

        return (
            <div>
                <h1>Registration Page</h1>
            <br/>
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
})

export default connect(mapStateToProps, { registerUser })(Register)