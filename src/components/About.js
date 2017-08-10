import React, { Component } from 'react';
import Config from '../Config';

class About extends Component {
    render() {
        return (
            <div className="about">

                <h3 style={{color: Config.colors.theme}}>Authors</h3>
                <p> Yanghua JIN (Fudan University/Preferred Networks)
                </p>
                <p> Jiakai ZHANG (Carnegie Mellon University)</p>
                <p> Minjun LI (Fudan University)  </p>

                <h3 style={{color: Config.colors.theme}}>Special Thanks</h3>
                <p>Eiichi Matsumoto, Taizan Yonetsuji, Saito Masaki, Kosuke Nakago (Preferred Networks)</p>
                <h3 style={{color: Config.colors.theme}}>License</h3>
                <p> The web interface is under the GPLv3 license. </p>
                <p> Model training scripts are under the MIT license.(Will be open-sourced soon.) </p>


                <h3 style={{color: Config.colors.theme}}>Links</h3>
                <h5><a href="https://chainer.org" target="_blank"  rel="noopener noreferrer">Chainer</a></h5>
                <h5><a href="https://mil-tokyo.github.io/webdnn/" target="_blank"  rel="noopener noreferrer">WebDNN</a></h5>

            </div>
        );
    }
}

export default About;
