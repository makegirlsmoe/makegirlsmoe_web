import Config from '../Config';
import {webglConstants, generatorConstants} from '../_constants'

const initOptions = (modelName)=>{

    let opts = {};

    Config.modelConfig[modelName].options.forEach(option => {
        opts[option.key] = {
            random: true,
            value: option.type === 'multiple' ? Array.apply(null, {length: option.options.length}).fill(-1)
                : option.type === 'continuous' ? option.min
                    :  -1
        }
    });
    opts.noise = {random: true};

    return opts;
};

const fixOptions = (options)=>{
    let opt = Object.assign({}, options);

    Object.keys(opt).map((key, index)=>
    {

        if(opt[key] && opt[key].hasOwnProperty('random')){
            opt[key] = Object.assign({},opt[key], {random:false})
        }
        return true;
    });
    return opt;
};

const assignOptionKeyRandom = (options, key)=>{
    return Object.assign({}, options, {
        [key]: Object.assign({}, options[key], {random: true})
    });
};

const assignOptionKeyFixedValue = (options, key, value)=>{
    if (value == null){
        return Object.assign({}, options, {
            [key]: Object.assign({}, options[key], {random: false})
        });
    }else{
        return Object.assign({}, options, {
            [key]: Object.assign({}, options[key], {random: false, value: value})
        });
    }
};

const initialGeneratorState =
    {
        currentModel: Config.defaultModel,
        options: initOptions(Config.defaultModel),
        results: [],

    };

export function generator(state = initialGeneratorState, action) {
    switch (action.type) {
        case generatorConstants.CHANGE_MODEL:
            if (state.currentModel === action.model){
                return state;
            }
            return {
                ...state,
                currentModel: action.model,
                results: [],
                options: initOptions(action.model)
            };

        case generatorConstants.RESET_OPTIONS:
            return {
                ...state,
                options: initOptions(state.currentModel)
            };

        case generatorConstants.FIX_OPTIONS:
            return {
                ...state,
                options: fixOptions(state.options)
            };

        case generatorConstants.SET_OPTIONS:
            return {
                ...state,
                options: action.options
            };

        case generatorConstants.APPEND_RESULT:
            return {
                ...state,
                results: action.appendResult ? state.results.concat([action.result]) : [action.result]
            };

        case generatorConstants.CHANGE_MODEL_OPTION:
            if (action.random) {
                return{
                    ...state,
                    options: assignOptionKeyRandom(state.options, action.key)
                };
            }
            else {
                return{
                    ...state,
                    options: assignOptionKeyFixedValue(state.options, action.key, action.value)
                };
            }

        default:
            return state
    }
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