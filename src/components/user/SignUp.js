import React, { Component } from 'react';
import { connect } from 'react-redux';
import Config from '../../Config';

class SignUp extends Component {
    render() {
        return (
            <div>
                <h3 style={{color: Config.colors.theme}}>User Register</h3>
                <div class="form-group">
                    <p>
                        <input type="text" name="username" className="form-control"  placeholder="Email Address"/>
                    </p>
                    <p>
                        <input type="password" name="password" className="form-control"  placeholder="Password"/>
                    </p>
                    <p>
                        <input type="password" name="password-confirm" className="form-control"  placeholder="Repeat your password"/>
                    </p>
                    <p>
                        <button className="btn btn-default" type="submit"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                            Sign Up
                        </button>
                    </p>
                </div>
            </div>
        );
    }
}

export default SignUp;
