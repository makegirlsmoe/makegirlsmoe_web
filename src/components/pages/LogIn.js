import React, { Component } from 'react';
import Config from '../../Config.js'

class LogIn extends Component {
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
                    <label>
                        <input type="checkbox" value="remember-me" id="rememberMe"
                               name="rememberMe"/>
                        Remember me
                    </label>
                </p>
                <p>
                    <button className="btn btn-default" type="submit"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                        Login
                    </button>
                </p>
            </div>
        );
    }
}

export default LogIn;
