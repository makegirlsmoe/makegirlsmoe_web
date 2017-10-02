# MakeGirlsMoe-Web

This repo contains the front-end part of [make.girls.moe](http://make.girls.moe/).

We decide to open-source model training scripts after the release of Chainer 3.0. Since Chainer do not support gradient norm function currently, we use some tricks in the training. 
Also, my personal repo [Chainer-GANs](https://github.com/Aixile/chainer-gan-experiments) contains some necessary references for reproducing our results.

## Running on local machine
1. Modify `src/Config.js` and set `var debug=true;`
2. `npm install`
3. `npm start`

## License
Source codes of the website are under the GPL v3.0 license.

[Pre-trained model files](https://github.com/makegirlsmoe/makegirls.moe_web/tree/master/public/models) are owned by Yanghua Jin. 
(Copyright 2017 Yanghua Jin All Rights Reserved.)

## Mirroring this site
If you want to build a mirror of this site or make some modifications, we requrie you to follow

1. Add a statement to clarify that your mirror site is not related to make.girls.moe official.
2. Distribute model files on your own server, this could be done by modifying [Config.js](https://github.com/makegirlsmoe/makegirls.moe_web/blob/master/src/Config.js).
3. Source codes should be available online because of the GPL license.