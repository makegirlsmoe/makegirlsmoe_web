import React, { Component } from 'react';
import MathJax from 'react-mathjax';
import Config from '../Config';

class News extends Component {
    render() {
        return (
            <div className="news">
                <h1 style={{color: Config.colors.theme}}>Create Anime Characters with A.I. !</h1>

                <p>
                We all love anime characters and are tempted to create our custom ones, but most of us simply cannot do that just because we are not pros.
                What if anime characters can be automatically generated in a profession level quality?
                Image that you just specify some attributes such as <span> blonde + twin tail + smile </span> and an anime character with your customization is generated whiteout any further intervention!
                </p>

                <p>
                Already we have some pioneers in the anime generation, such as <a href="https://github.com/pfnet-research/chainer-gan-lib">ChainerDCGAN</a>, <a href="http://qiita.com/rezoolab/items/5cc96b6d31153e0c86bc">Chainerを使ってコンピュータにイラストを描かせる</a>,
                and online-available code such as<a href="https://github.com/tdrussell/IllustrationGAN">IllustrationGAN</a> and  <a href="https://github.com/jayleicn/animeGAN">AnimeGAN</a>.
                But very often results generated these models are <a href="https://github.com/jayleicn/animeGAN/blob/master/images/fake_sample.png">blurred</a> and <a href="https://qiita-image-store.s3.amazonaws.com/0/61296/7838e32d-1ca9-be96-ddd9-2e400be99ea1.jpeg">distorted</a>,
                and it is still a challenge to generate industry-standard facial images for anime characters.
                As a step towards tackling this challenge, we propose a model that produces anime faces at high quality with promising rate of success.
                </p>

                <h5 style={{color: Config.colors.theme}}> Dataset: a Model of Good Quality Begins with a Clean Dataset. </h5>
                <p>
                To teach computer to do things requires high quality data, and our case is not an exception.
                Large scale image boards like
                <a href="https://danbooru.donmai.us">Danbooru</a>
                and <a href="https://safebooru.org">Safebooru</a>
                are noisy and we think this is at least partial reason for issues in previous works,
                so instead we use standing pictures (立ち絵) from games sold on <a href="www.getchu.com">Getchu</a>,
                a website providing information and selling of Japanese games.
                Standing pictures are diverse enough since they are of different styles for games in a diverse sets of theme,
                yet consisting since they are all belonging to domain of character images.
                We also need categorical metadata (a.k.a tags/attributes) of images like hair color, whether smiling or not.
                Getchu does not provide such metadata, so we use <a href="saito2015illustration2vec">Illustration2Vec</a>,
                a CNN-based tool for estimating tags of anime.
                </p>

                <h5 style={{color: Config.colors.theme}}> Model: The Essential Part </h5>
                <p>
                A good model is also a must-have for our goal.
                The generator should know and follow user&#39;s specified attributes, which is called <em>prior</em> or <em>condition</em>,
                and should also have freedom to generate different, detailed visual features, which is modeled using <em>noise</em>.
                We use a popular framework called <a href="https://papers.nips.cc/paper/5423-generative-adversarial-nets">GAN</a> (Generative Adversarial Networks).
                GAN uses a generator network <MathJax.Context><MathJax.Node inline>{'G'}</MathJax.Node></MathJax.Context> to generate images from prior and noise,
                and also a another network <MathJax.Context><MathJax.Node inline>{'D'}</MathJax.Node></MathJax.Context> trying to distinguish <MathJax.Context><MathJax.Node inline>{'G'}</MathJax.Node></MathJax.Context>&#39;s images from real images.
                We train them, and in the end <MathJax.Context><MathJax.Node inline>{'G'}</MathJax.Node></MathJax.Context> should be able to generate images so realistic that <MathJax.Context><MathJax.Node inline>{'D'}</MathJax.Node></MathJax.Context> cannot tell it from real images, given the prior.
                However it is infamously hard and time-consuming to properly train GAN.
                Luckily a recent advance, named <a href="https://arxiv.org/abs/1705.07215">DRAGAN</a>,
                can give presumable results compare to other GANs with least computation power required.
                We successfully train the DRAGAN whose generate is <a href="https://arxiv.org/abs/1609.04802">SRResNet</a>-like.
                Also, we need our generator to know the label information so user&#39;s customization can be used. Inspired by <a href="https://arxiv.org/abs/1610.09585">ACGAN</a>,
                we feed the labels to the generator <MathJax.Context><MathJax.Node inline>{'G'}</MathJax.Node></MathJax.Context> along with noise and w add a multi-label classifier on the top of discriminator <MathJax.Context><MathJax.Node inline>{'D'}</MathJax.Node></MathJax.Context>, which try to predict the assigned tags for the images. </p>

                <h5 style={{color: Config.colors.theme}}> Samples: A Picture is Worth a Thousand Words </h5>
                <p>To taste the quality of our model, see the generated images like the following: it handles different attributes and visual features well.</p>

                <p><img src="news-img/samples.jpg" width="500"/></p>

                <p>One interesting setting would be fixing the random noise part and sampling random priors. The model now is required to generate images have similar major visual features with different attribute combinations, and it does well:</p>

                <p><img src="news-img/fixed_noise.jpg" width="500"/></p>

                <p>Also, by fixing priors and sampling randomly the noise, the model can generate images have the same attributes with different visual features:</p>

                <p><img src="news-img/fix_attributes_a.png" width="500"/></p>


                <h5 style={{color: Config.colors.theme}}> Web Interface: Bring Neural Generator to your Browser </h5>
                <p>
                In order to make our model more accessible, we build this <a href="http://make.girls.moe">website interface</a> with <a href="https://facebook.github.io/react/">React.js</a> for open access.
                We also make the generation completed done on the browser side, by imposing <a href="https://mil-tokyo.github.io/webdnn/">WebDNN</a> and converting the trained Chainer model to the WebAssembly based Javascript model.
                For a better user experience, we would like to keep the size of generator model small since users need to download the model before generating, so we replace the DCGAN generator by SRResNet generator can make the model <MathJax.Context><MathJax.Node inline>{'4'}</MathJax.Node></MathJax.Context> times smaller.
                Speed-wise, even all computations are done on the client side, on average it takes only about <MathJax.Context><MathJax.Node inline>{'6'}</MathJax.Node></MathJax.Context> seconds to generate a single image.</p>

                <h5 style={{color: Config.colors.theme}}> For more technical details, please check out our <a href="http://make.girls.moe/technical_report.pdf">technical report</a>. </h5>

            </div>
        );
    }
}

export default News;
