import Config from '../Config';

const initOptions = (modelName)=>{

    let keys = {};

    Config.modelConfig[modelName].options.forEach(option => {
        keys[option.key] = {
            random: true,
            value: option.type === 'multiple' ? Array.apply(null, {length: option.options.length}).fill(-1) : -1
        }
    });

    return {
        currentModel : modelName,
        keys: keys,
        noise : {random: true}
    };
};

const initialState =
    {
        options: initOptions(Config.defaultModel),
        results: [],
        rating: 0,
        mode: 'normal',
        webglAvailable: false
    };


export function generator(state = initialState, action) {
    return state;
}

