import React, { Component } from 'react';
import Config from '../Config';

class About extends Component {
    render() {
        return (
            <div className="About">
                <h3 style={{color: Config.colors.theme}}>About</h3>
            </div>
        );
    }
}

export default About;
