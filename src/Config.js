var debug = false;

var Config = {
    colors: {
        theme: '#bd1c1b',
        themeDarker: '#961a19'
    },
    options: [
        {
            key: 'hair_color',
            type: 'multiple',
            options: ['blonde', 'brown', 'black', 'blue', 'pink', 'purple', 'green', 'red', 'silver', 'white', 'orange', 'aqua', 'grey'],
            offset: 0,
            prob: [0.15968645,  0.21305391,  0.15491921,  0.10523116,  0.07953927,
                0.09508879,  0.03567429,  0.07733163,  0.03157895,  0.01833307,
                0.02236442,  0.00537514,  0.00182371]
        },
        {
            key: 'hair_style',
            type: 'multiple',
            options: ['long_hair', 'short_hair', 'twin_tail',  'drill_hair', 'ponytail'],
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
            prob: [0.28350664,  0.15760678,  0.17862742,  0.13412254,  0.14212126,
                0.0543913 ,  0.01020637,  0.00617501,  0.03167493,  0.00156775]
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
            offset: 19            ,
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
        model: '/models/model_resnet_with_condition_128_full_1',
        modelServers: debug ? ['localhost:3000'] : ['106.187.49.34:8080']
    },
    stat: {
        enabled: debug ? false : true,
        urlPrefix: (debug ? 'http://localhost:6253' : '') + '/api/stat'
    },
    twitter: {
        urlPrefix: (debug ? 'http://localhost:6253' : '') + '/api/twitter',
        callback: (debug ? 'http://localhost:3000' : '') + '/#/twitter',
        defaultText: 'A.I.で二次元キャラ生成！　Automatically created by #MakeGirlsMoe: http://make.girls.moe'
    }
};

export default Config;