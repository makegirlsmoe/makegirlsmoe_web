import React, { Component } from 'react';
import Config from '../../Config';
import pfnLogo from '../../img/PFN_logo.png';

class About extends Component {
    render() {
        return (
            <div className="about">

                <h3 style={{color: Config.colors.theme}}>Site Authors</h3>
                <p> Yanghua Jin / yanghuajin94@gmail.com / <a href="https://twitter.com/namaniku0" target="_blank" rel="noopener noreferrer">Aixile</a> (Fudan University)   </p>
                <p> Jiakai Zhang / zhangjk95@gmail.com (Carnegie Mellon University)</p>
                <h3 style={{color: Config.colors.theme}}>Technical Report</h3>
                <a href="https://makegirlsmoe.github.io/assets/pdf/technical_report.pdf" target="_blank" rel="noopener noreferrer">Create Anime Characters with A.I. ! </a> <br/>
                First presented as a Doujinshi on <a href="http://www.comiket.co.jp/" target="_blank" rel="noopener noreferrer"> Comiket</a> 92, Summer 2017, with the booth number 三日目東ウ05a ガールス・マニホールド<br/>
                <h4 style={{color: Config.colors.theme}}>Arxiv Version</h4>
                <a href="https://arxiv.org/abs/1708.05509" target="_blank" rel="noopener noreferrer">Towards the Automatic Anime Characters Creation with Generative Adversarial Networks</a> <br/>
                <h4 style={{color: Config.colors.theme}} >Technical Report Authors </h4>
                <p> Yanghua Jin, Minjun Li, Yingtao Tian, Huachun Zhu</p>
                <h4 style={{color: Config.colors.theme}} >Doujinshi Cover Design</h4>
                <p>Zhihao Fang </p>
                <h4 style={{color: Config.colors.theme}} > </h4>
                <h3 style={{color: Config.colors.theme}}>Special Thanks</h3>
                <p>Eiichi Matsumoto, Taizan Yonetsuji, Saito Masaki, Kosuke Nakago, Tatsuya Takamura (Preferred Networks)</p>
                <p>Thanks to <a href="https://www.preferred-networks.jp/" target="_blank" rel="noopener noreferrer" style={{color:'#0060de', fontSize: '18'}}><img src={pfnLogo} width="24" alt="PFN Logo" /> Preferred Networks</a> for their kind support!</p>
                <p>Thanks to Kikura Yuichiro and Masatoshi Hidaka for the awesome browser-based nn inference library <a href="https://mil-tokyo.github.io/webdnn/" target="_blank"  rel="noopener noreferrer">WebDNN.</a></p>

                <h3 style={{color: Config.colors.theme}}>Links</h3>
                <h5><a href="https://chainer.org" target="_blank"  rel="noopener noreferrer">Chainer</a></h5>
                <h5><a href="https://mil-tokyo.github.io/webdnn/" target="_blank"  rel="noopener noreferrer">WebDNN</a></h5>

            </div>
        );
    }
}

export default About;
