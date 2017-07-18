import React, { Component } from 'react';
import Config from '../Config';

class About extends Component {
    render() {
        return (
            <div className="About">

                <h3 style={{color: Config.colors.theme}}>Authors</h3>
                <p> Yanghua JIN (Fudan University/Preferred Networks)</p>
                <p> Jiakai ZHANG (Carnegie Mellon University)</p>

            </div>
        );
    }
}

export default About;
