import React from 'react';
import { logOut } from './action/authAction';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

export const Dashboard = ({ LoginAccess,logOut }) => {
    return (
        <div>
            <h1>
                Games Rental
            </h1>
            <Link to="/register" style ={{ display: LoginAccess ? "none" : "block "}}>Register</Link>
            <br/>
            <Link to="/login" style ={{ display: LoginAccess ? "none" : "block "}}>Login</Link>
            {
                LoginAccess ? (
                    <div>
                        <h1>Login Success</h1>
                        <br/>
                        <button onClick={() => logOut()}>
                            Log Out
                        </button>
                    </div>
                )
                :
                (
                    <div>
                        <h1>You are logged out.</h1>
                    </div>
                )

            }
        </div>
    )
}

const mapStateToProps = state => ({
    LoginAccess: state.LoginAccess
})

export default connect(mapStateToProps)(Dashboard);