var debug = false;
var hostServer = 'make.girls.moe';
var apiHostServer = 'https://apimgm.girls.moe';
var backendUrlPrefix = (debug ? 'http://localhost:6253' : apiHostServer);
var frontendUrlPrefix = (debug ? 'http://localhost:3000' : '');
var Config = {
    colors: {
        theme: '#bd1c1b',
        themeDarker: '#961a19'
    },
    defaultModel: 'Camellia',
    modelList: ['Amaryllis', 'Bouvardia128', 'Bouvardia256', 'Camellia'],
    modelCompression: true,
    modelConfig: {
        Amaryllis: {
            name: 'Amaryllis',
            options: [
                {
                    key: 'hair_color',
                    type: 'multiple',
                    options: ['blonde', 'brown', 'black', 'blue', 'pink', 'purple', 'green', 'red', 'silver', 'white', 'orange', 'aqua', 'grey'],
                    offset: 0,
                    prob: [0.15968645, 0.21305391, 0.15491921, 0.10523116, 0.07953927,
                        0.09508879, 0.03567429, 0.07733163, 0.03157895, 0.01833307,
                        0.02236442, 0.00537514, 0.00182371]
                },
                {
                    key: 'hair_style',
                    type: 'multiple',
                    options: ['long_hair', 'short_hair', 'twin_tail', 'drill_hair', 'ponytail'],
                    offset: 13,
                    //prob: [0.52989922,  0.37101264,  0.12567589,  0.00291153,  0.00847864],
                    isIndependent: true,
                    prob: Array.apply(null, {length: 5}).fill(0.25)
                },
                {
                    key: 'eye_color',
                    type: 'multiple',
                    options: ['blue', 'red', 'brown', 'green', 'purple', 'yellow', 'pink', 'aqua', 'black', 'orange'],
                    offset: 24,
                    prob: [0.28350664, 0.15760678, 0.17862742, 0.13412254, 0.14212126,
                        0.0543913, 0.01020637, 0.00617501, 0.03167493, 0.00156775]
                },
                {
                    key: 'blush',
                    type: 'binary',
                    offset: 18,
                    prob: 0.6
                },
                {
                    key: 'smile',
                    type: 'binary',
                    offset: 19,
                    prob: 0.6
                },
                {
                    key: 'open_mouth',
                    type: 'binary',
                    offset: 20,
                    prob: 0.25
                },
                {
                    key: 'hat',
                    type: 'binary',
                    offset: 21,
                    prob: 0.04488882
                },
                {
                    key: 'ribbon',
                    type: 'binary',
                    offset: 22,
                    prob: 0.3
                },
                {
                    key: 'glasses',
                    type: 'binary',
                    offset: 23,
                    prob: 0.05384738
                }
            ],
            gan: {
                noiseLength: 128,
                labelLength: 34,
                imageWidth: 128,
                imageHeight: 128,
                model: '/models/Amaryllis',
                modelServers: debug ? [window.location.host] : [
                    hostServer
                ]
            },
        },
        Bouvardia128: {
            name: 'Bouvardia',
            options: [
                {
                    key: 'hair_color',
                    type: 'multiple',
                    options: ['blonde', 'brown', 'black', 'blue', 'pink', 'purple', 'green', 'red', 'silver', 'white', 'orange', 'aqua', 'grey'],
                    offset: 0,
                    prob: [0.15968645, 0.21305391, 0.15491921, 0.10523116, 0.07953927,
                        0.09508879, 0.03567429, 0.07733163, 0.03157895, 0.01833307,
                        0.02236442, 0.00537514, 0.00182371]
                },
                {
                    key: 'hair_style',
                    type: 'multiple',
                    options: ['long_hair', 'short_hair', 'twin_tail', 'drill_hair', 'ponytail'],
                    offset: 23,
                    //prob: [0.52989922,  0.37101264,  0.12567589,  0.00291153,  0.00847864],
                    isIndependent: true,
                    prob: Array.apply(null, {length: 5}).fill(0.25)
                },
                {
                    key: 'eye_color',
                    type: 'multiple',
                    options: ['blue', 'red', 'brown', 'green', 'purple', 'yellow', 'pink', 'aqua', 'black', 'orange'],
                    offset: 13,
                    prob: [0.28350664, 0.15760678, 0.17862742, 0.13412254, 0.14212126,
                        0.0543913, 0.01020637, 0.00617501, 0.03167493, 0.00156775]
                },
                {
                    key: 'dark_skin',
                    type: 'binary',
                    offset: 28,
                    prob: 0.05
                },
                {
                    key: 'blush',
                    type: 'binary',
                    offset: 29,
                    prob: 0.6
                },
                {
                    key: 'smile',
                    type: 'binary',
                    offset: 30,
                    prob: 0.6
                },
                {
                    key: 'open_mouth',
                    type: 'binary',
                    offset: 31,
                    prob: 0.25
                },
                {
                    key: 'hat',
                    type: 'binary',
                    offset: 32,
                    prob: 0.04488882
                },
                {
                    key: 'ribbon',
                    type: 'binary',
                    offset: 33,
                    prob: 0.3
                },
                {
                    key: 'glasses',
                    type: 'binary',
                    offset: 34,
                    prob: 0.05384738
                },
                {
                    key: 'year',
                    type: 'continuous',
                    min: -1.5,
                    max: 1.5,
                    step: 0.1,
                    samplingMin: -1,
                    samplingMax: 1,
                    offset: 35,
                    prob: 0.8
                }
            ],
            gan: {
                noiseLength: 128,
                labelLength: 36,
                imageWidth: 128,
                imageHeight: 128,
                model: '/models/Bouvardia128',
                modelServers: debug ? [window.location.host] : [
                    hostServer
                ]
            },
        },
        Bouvardia256: {
            name: 'Bouvardia',
            options: [
                {
                    key: 'hair_color',
                    type: 'multiple',
                    options: ['blonde', 'brown', 'black', 'blue', 'pink', 'purple', 'green', 'red', 'silver', 'white', 'orange', 'aqua', 'grey'],
                    offset: 0,
                    prob: [0.15968645, 0.21305391, 0.15491921, 0.10523116, 0.07953927,
                        0.09508879, 0.03567429, 0.07733163, 0.03157895, 0.01833307,
                        0.02236442, 0.00537514, 0.00182371]
                },
                {
                    key: 'hair_style',
                    type: 'multiple',
                    options: ['long_hair', 'short_hair', 'twin_tail', 'drill_hair', 'ponytail'],
                    offset: 23,
                    //prob: [0.52989922,  0.37101264,  0.12567589,  0.00291153,  0.00847864],
                    isIndependent: true,
                    prob: Array.apply(null, {length: 5}).fill(0.25)
                },
                {
                    key: 'eye_color',
                    type: 'multiple',
                    options: ['blue', 'red', 'brown', 'green', 'purple', 'yellow', 'pink', 'aqua', 'black', 'orange'],
                    offset: 13,
                    prob: [0.28350664, 0.15760678, 0.17862742, 0.13412254, 0.14212126,
                        0.0543913, 0.01020637, 0.00617501, 0.03167493, 0.00156775]
                },
                {
                    key: 'dark_skin',
                    type: 'binary',
                    offset: 28,
                    prob: 0.05
                },
                {
                    key: 'blush',
                    type: 'binary',
                    offset: 29,
                    prob: 0.6
                },
                {
                    key: 'smile',
                    type: 'binary',
                    offset: 30,
                    prob: 0.6
                },
                {
                    key: 'open_mouth',
                    type: 'binary',
                    offset: 31,
                    prob: 0.25
                },
                {
                    key: 'hat',
                    type: 'binary',
                    offset: 32,
                    prob: 0.04488882
                },
                {
                    key: 'ribbon',
                    type: 'binary',
                    offset: 33,
                    prob: 0.3
                },
                {
                    key: 'glasses',
                    type: 'binary',
                    offset: 34,
                    prob: 0.05384738
                },
                {
                    key: 'year',
                    type: 'continuous',
                    min: -1.5,
                    max: 1.5,
                    step: 0.1,
                    samplingMin: -1,
                    samplingMax: 1,
                    offset: 35,
                    prob: 0.8
                }
            ],
            gan: {
                noiseLength: 128,
                labelLength: 36,
                imageWidth: 256,
                imageHeight: 256,
                model: '/models/Bouvardia256',
                modelServers: debug ? [window.location.host] : [
                    hostServer
                ]
            },
        },
        Camellia: {
            name: 'Camellia',
            options: [
                {
                    key: 'hair_color',
                    type: 'multiple',
                    options: ['blonde', 'brown', 'black', 'blue', 'pink', 'purple', 'green', 'red', 'silver', 'white', 'orange', 'aqua', 'grey'],
                    offset: 0,
                    prob: [0.15968645, 0.21305391, 0.15491921, 0.10523116, 0.07953927,
                        0.09508879, 0.03567429, 0.07733163, 0.03157895, 0.01833307,
                        0.02236442, 0.00537514, 0.00182371]
                },
                {
                    key: 'hair_style',
                    type: 'multiple',
                    options: ['long_hair', 'short_hair', 'twin_tail', 'drill_hair', 'ponytail'],
                    offset: 23,
                    //prob: [0.52989922,  0.37101264,  0.12567589,  0.00291153,  0.00847864],
                    isIndependent: true,
                    prob: Array.apply(null, {length: 5}).fill(0.25)
                },
                {
                    key: 'eye_color',
                    type: 'multiple',
                    options: ['blue', 'red', 'brown', 'green', 'purple', 'yellow', 'pink', 'aqua', 'black', 'orange'],
                    offset: 13,
                    prob: [0.28350664, 0.15760678, 0.17862742, 0.13412254, 0.14212126,
                        0.0543913, 0.01020637, 0.00617501, 0.03167493, 0.00156775]
                },
                {
                    key: 'dark_skin',
                    type: 'binary',
                    offset: 28,
                    prob: 0.05
                },
                {
                    key: 'blush',
                    type: 'binary',
                    offset: 29,
                    prob: 0.6
                },
                {
                    key: 'smile',
                    type: 'binary',
                    offset: 30,
                    prob: 0.6
                },
                {
                    key: 'open_mouth',
                    type: 'binary',
                    offset: 31,
                    prob: 0.25
                },
                {
                    key: 'hat',
                    type: 'binary',
                    offset: 32,
                    prob: 0.04488882
                },
                {
                    key: 'ribbon',
                    type: 'binary',
                    offset: 33,
                    prob: 0.3
                },
                {
                    key: 'glasses',
                    type: 'binary',
                    offset: 34,
                    prob: 0.05384738
                },
                {
                    key: 'year',
                    type: 'continuous',
                    min: -1.5,
                    max: 1.5,
                    step: 0.1,
                    samplingMin: -1,
                    samplingMax: 1,
                    offset: 35,
                    prob: 0.8
                }
            ],
            gan: {
                noiseLength: 128,
                labelLength: 36,
                imageWidth: 256,
                imageHeight: 256,
                model: '/models/Camellia',
                modelServers: debug ? [window.location.host] : [
                    hostServer
                ]
            },
        },
    },

    stat: {
        enabled: debug ? false : true,
        urlPrefix: backendUrlPrefix + '/api/stat'
    },
    twitter: {
        urlPrefix: backendUrlPrefix + '/api/twitter',
        callback: frontendUrlPrefix + '/#/twitter',
        defaultText: 'A.I.で二次元キャラ生成！　Automatically created by #MakeGirlsMoe: http://make.girls.moe'
    },
    geoip: {
        url: backendUrlPrefix + '/api/geoip',
        timeout: 2000
    }
};

export default Config;