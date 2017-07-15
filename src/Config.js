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
            offset: 0
        },
        {
            key: 'hair_style',
            type: 'multiple',
            options: ['long hair', 'short hair', 'twin tail', 'very long hair', 'drill hair', 'ponytail', 'side ponytail'],
            offset: 13
        },
        {
            key: 'blush',
            type: 'binary',
            offset: 20
        },
        {
            key: 'smile',
            type: 'binary',
            offset: 21
        },
        {
            key: 'open_mouth',
            type: 'binary',
            offset: 22
        },
        {
            key: 'hat',
            type: 'binary',
            offset: 23
        },
        {
            key: 'ribbon',
            type: 'binary',
            offset: 24
        },
        {
            key: 'glasses',
            type: 'binary',
            offset: 25
        },
        {
            key: 'lips',
            type: 'binary',
            offset: 26
        },
        {
            key: 'eye_color',
            type: 'multiple',
            options: ['blue', 'red', 'brown', 'green', 'purple', 'yellow', 'pink', 'aqua', 'black', 'orange', 'grey'],
            offset: 27
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