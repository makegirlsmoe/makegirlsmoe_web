import React, { Component } from 'react';
import Config from '../../Config';

class License extends Component {
    render() {
        return (
            <div className="license">
                <h3 style={{color: Config.colors.theme}}>License</h3>
                <p>To use MakeGirlsMoe, you must agree with the following licenses.</p>
                <p>MakeGirlsMoe is freely available only for non-commercial use. Please, see the <a href="https://github.com/makegirlsmoe/makegirlsmoe_web/blob/master/LICENSE.txt"> license</a> for further details. For commercial queries, contact  <a href="mailto:yanghuajin94@gmail.com" target="_blank" rel="noopener noreferrer">Yanghua Jin</a>.</p>
                <p>The code of web interface is under the GPL v3.0 license and can be redistributed.</p>
                <p>All the compiled model files are privately owned by Yanghua Jin and are not allowed for unauthorized commercial use.</p>
                <p>&nbsp;</p>
                <p>使MakeGirlsMoeを使うためには、以下のライセンスへの同意が必要です。</p>
                <p>MakeGirlsMoeは非営利目的にのみ無料で使用可能です。詳細については<a href="https://github.com/makegirlsmoe/makegirlsmoe_web/blob/master/LICENSE.txt">ライセンス</a>をご覧になってください。商用利用の場合については、作成者である<a href="mailto:yanghuajin94@gmail.com" target="_blank" rel="noopener noreferrer">Yanghua Jin</a>までご連絡ください。</p>
                <p>WebインターフェースのプログラムコードはGPL v3.0ライセンスへ準拠しており、再配布可能です。</p>
                <p>全ての機械学習モデルファイルは、作成者であるYanghua Jinによって個人的に所有されており、許可なく商用利用することは認められません。</p>
                <p>&nbsp;</p>
                <p>使用MakeGirlsMoe前请注意以下条款</p>
                <p>MakeGirlsMoe可以免费用于任何非商业用途，请在这里查看具体<a href="https://github.com/makegirlsmoe/makegirlsmoe_web/blob/master/LICENSE.txt">使用许可</a>。对于任何商业请求与咨询，请联系<a href="mailto:yanghuajin94@gmail.com" target="_blank" rel="noopener noreferrer">Yanghua Jin</a>。</p>
                <p>网站前端源代码部分使用GPL v3.0许可，可以在遵守相关许可的情况下重新发放。</p>
                <p>所有的预训练模型相关的文件，都由Yanghua Jin所私有，请勿在未经过许可的情况下进行任何商业使用。</p>

            </div>
        );
    }
}

export default License;
