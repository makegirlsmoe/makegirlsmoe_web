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
            prob: [0.161390977, 0.209924812, 0.161616541, 0.10406015, 0.080112782, 0.092030075, 0.033684211, 0.075, 0.034398496, 0.019473684, 0.020827068, 0.005601504, 0.001879699]
        },
        {
            key: 'hair_style',
            type: 'multiple',
            options: ['long_hair', 'short_hair', 'twin_tail', {key: 'very_long_hair', disabled: true}, 'drill_hair', 'ponytail', 'side_ponytail'],
            offset: 13,
            prob: [0.515217315, 0.344832417, 0.125380871, 0, 0.002906875, 0.008825693, 0.00283683]
        },
        {
            key: 'blush',
            type: 'binary',
            offset: 20,
            prob: 0.366390977
        },
        {
            key: 'smile',
            type: 'binary',
            offset: 21            ,
            prob: 0.342593985
        },
        {
            key: 'open_mouth',
            type: 'binary',
            offset: 22,
            prob: 0.133345865
        },
        {
            key: 'hat',
            type: 'binary',
            offset: 23,
            prob: 0.046315789
        },
        {
            key: 'ribbon',
            type: 'binary',
            offset: 24,
            prob: 0.182631579
        },
        {
            key: 'glasses',
            type: 'binary',
            offset: 25,
            prob: 0.051240602
        },
        {
            key: 'lips',
            type: 'binary',
            offset: 26,
            prob: 0.042781955
        },
        {
            key: 'eye_color',
            type: 'multiple',
            options: ['blue', 'red', 'brown', 'green', 'purple', 'yellow', 'pink', 'aqua', 'black', 'orange', {key: 'grey', disabled: true}],
            offset: 27,
            prob: [0.292730769, 0.164730769, 0.175115385, 0.132846154, 0.150615385, 0.059230769, 0.010846154, 0.006769231, 0.027576923, 0.001807692, 0.000807692]
        }
    ],
    gan: {
        noiseLength: 128,
        labelLength: 38,
        imageWidth: 128,
        imageHeight: 128,
        model: '/models/model_resnet_with_condition_128_1'
    },
    stat: {
        enabled: true,
        urlPrefix: '/api/stat'
    }
};

export default Config