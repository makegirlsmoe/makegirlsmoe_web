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
                <p></p>
                <p>使用MakeGirlsMoe前请注意以下条款</p>
                <p>MakeGirlsMoe可以免费用于任何非商业用途，请在这里查看具体使用许可。对于任何商业请求与咨询，请联系Yanghua Jin。</p>

                <p>网站前段源代码部分使用GPL v3.0许可，可以在遵守相关许可的情况下重新发放。</p>
                <p>所有的预训练模型相关的文件，都由Yanghua Jin所私有，请勿在未经过许可的情况下进行任何商业使用。</p>

            </div>
        );
    }
}

export default License;
