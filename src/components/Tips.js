import React, { Component } from 'react';
import Config from '../Config';

class Tips extends Component {
    render() {
        return (
            <div className="tips">
                <h3 style={{color: Config.colors.theme}}>Better generation</h3>
                <p>
                    The input of the model consists of two parts, the random noise part and the condition part.
                    If you generate a good image, you could try to <strong>fix the noise part</strong> and use random conditions to get more good images.
                    We have observed that a good random noise is important for the better generation.
                </p>
                <h3 style={{color: Config.colors.theme}}>Faster generation</h3>
                <p>
                    Currently, all computation is done on your web browser by <a href="https://mil-tokyo.github.io/webdnn/" target="_blank" rel="noopener noreferrer">WebDNN</a>. By default, It uses WebAssembly as the backend.
                    But if you are a Mac user, you could try to install <a href="https://developer.apple.com/safari/technology-preview/" rel="noopener noreferrer">Safari Technology Preview</a> and
                    turn on WebGPU in Develop -> Experimental Features -> WebGPU.
                    This will enable the WebGPU backend, which is <strong>100x faster</strong> than WebAssembly! Notice that WebGPU may not work on AMD GPUs as reported <a href="https://github.com/mil-tokyo/webdnn/issues/286" target="_blank" rel="noopener noreferrer">here</a>.

                </p>

                {/*<h3 style={{color: Config.colors.theme}}>Model detail</h3>*/}
                {/*<p> The current model is based on <a href="https://arxiv.org/abs/1406.2661" target="_blank"> Generative Adversarial Networks</a>. Technically, it uses <a href="https://arxiv.org/abs/1610.09585" target="_blank">AC-GAN</a> to do conditional*/}
                    {/*generation, along with a <a href="https://arxiv.org/abs/1705.07215" target="_blank"> DRAGAN</a>-style gradient penalty term in training. The generator is based on a <a href="https://arxiv.org/abs/1609.04802" target="_blank">SRResNet</a>-like structure.</p>*/}

            </div>
        );
    }
}

export default Tips;
/**
 * Created by aixile on 2017/07/20.
 */
