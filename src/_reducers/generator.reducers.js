import Config from '../Config';
import {webglConstants} from '../_constants'

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
    };


export function generator(state = initialState, action) {
    return state;
}

const initialGeneratorConfigState =
    {
        webglAvailable: false,
        webglDisabled: false,
    };

export function generatorConfig(state = initialGeneratorConfigState, action) {
    switch (action.type) {
        case webglConstants.CHANGE_AVAILABILITY:
            return {
                ...state,
                webglAvailable: action.value,
            };
        case webglConstants.CHANGE_VISIBILITY:
            return {
                ...state,
                webglDisabled: !action.value,
            };
        default:
            return state
    }
}