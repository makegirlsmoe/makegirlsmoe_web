import React, { Component } from 'react';
import Config from '../../Config';

class License extends Component {
    render() {
        return (
            <div className="license">
                <h3 style={{color: Config.colors.theme}}>License</h3>
                <p>To use MakeGirlsMoe, you must agree with the following licenses.</p>
                <p>MakeGirlsMoe is freely available only for non-commercial use. Please, see the license for further details. For commercial queries, contact Yanghua Jin.</p>

                <p>The code of web interface is under the GPL v3.0 license and can be redistributed.</p>
                <p>All the compiled model files are privately owned by Yanghua Jin and are not allowed for unauthorized commercial use.</p>

            </div>
        );
    }
}

export default License;
