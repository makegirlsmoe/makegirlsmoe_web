import React, { Component } from 'react';
import Config from '../../Config';

class SignUp extends Component {
    render() {
        return (
            <div>
                <h3 style={{color: Config.colors.theme}}>Please Login</h3>
                <p>
                    <input type="text" name="username" placeholder="Email Address"/>
                </p>
                <p>
                    <input type="password" name="password" placeholder="Password"/>
                </p>
                <p>
                    <input type="password" name="password-confirm" placeholder="Repeat your password"/>
                </p>
                <p>
                    <button className="btn btn-default" type="submit"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                        Sign Up
                    </button>
                </p>
            </div>
        );
    }
}

export default SignUp;
