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

const initOptionsExceptNoise = (modelName, currentOpt)=>{

    let opts = {};

    Config.modelConfig[modelName].options.forEach(option => {
        opts[option.key] = {
            random: true,
            value: option.type === 'multiple' ? Array.apply(null, {length: option.options.length}).fill(-1)
                : option.type === 'continuous' ? option.min
                    :  -1
        }
    });
    opts.noise = {random: true, value:currentOpt.noise.value};

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
    return Object.assign({}, options, {
        [key]: Object.assign({}, options[key], {random: false, value: value})
    });
};

const initialGeneratorState =
    {
        currentModel: Config.defaultModel,
        currentIndex: -1,
        options: initOptions(Config.defaultModel),
        results: [],
        resultsOptions: [],
        failedGenerating: false,
    };

const checkFailed = (result)=> {
    if (result.length !== 0){
        let valCnt={};
        let lim=result.length/3;
        for (let i=0; i<result.length;i++) {
            valCnt[result[i]] = valCnt[result[i]] ? valCnt[result[i]] + 1 : 1;
            if (valCnt[result[i]] > lim){
                return true;
            }
        }
    }
    return false;
};

export function generator(state = initialGeneratorState, action) {
    //console.log(state);
    switch (action.type) {
        case generatorConstants.CHANGE_MODEL:
            if (state.currentModel === action.model){
                return state;
            }
            return {
                ...state,
                currentModel: action.model,
                currentIndex: -1,
                //results: [],
                //resultsOptions: [],
                options: initOptions(action.model),
                input: {
                    noise: null,
                    label: null
                },
                transition: {
                    start: null,
                    end: null,
                    middle: []
                },
                count: 1
            };

        case generatorConstants.RESET_OPTIONS:
            return {
                ...state,
                options: initOptionsExceptNoise(state.currentModel, state.options)
            };

        case generatorConstants.FIX_OPTIONS:
            return {
                ...state,
                options: fixOptions(state.options)
            };

        case generatorConstants.FIX_NOISE_OPTION:
            return {
                ...state,
                options: {
                    ...state.options,
                    noise:{
                        random:false,
                        value:state.options.noise.value
                    }
                }
            };

        case generatorConstants.SET_NOISE_VALUE:
            //console.log(action.value);
            return {
                ...state,
                options: {
                    ...state.options,
                    noise:{
                        random:false,
                        value:action.value
                    }
                }
            }

        case generatorConstants.SET_OPTIONS:
            return {
                ...state,
                options: action.options
            };

        case generatorConstants.SET_INPUT:
            return {
                ...state,
                input: action.input
            };

        case generatorConstants.APPEND_RESULT:
            let failed = checkFailed(action.result);
            return {
                ...state,
                results: action.appendResult ? state.results.concat([action.result]) : [action.result],
                resultsOptions: action.appendResult ? state.resultsOptions.concat([action.options]) : [action.options],
                currentIndex: action.appendResult ? state.results.length : 0,
                failedGenerating: failed
            };

        case generatorConstants.CHANGE_MODEL_OPTION:
            var value = action.value==null ? state.options[action.key].value : action.value;
            if (action.key === 'noise' && !action.random && !value) {
                return state;
            }
            if (action.random) {
                return{
                    ...state,
                    options: assignOptionKeyRandom(state.options, action.key)
                };
            }
            else {
                return{
                    ...state,
                    options: assignOptionKeyFixedValue(state.options, action.key, value)
                };
            }

        case generatorConstants.SET_TRANSITION_START:
            return{
                ...state,
                transition: {
                    ...state.transition,
                    start: { result: action.result, input: action.input },
                    middle: []
                }
            };

        case generatorConstants.SET_TRANSITION_END:
            return{
                ...state,
                transition: {
                    ...state.transition,
                    end: { result: action.result, input: action.input },
                    middle: []
                }
            };

        case generatorConstants.APPEND_TRANSITION_MIDDLE:
            var item = {
                result: action.result,
                input: action.input
            };

            return {
                ...state,
                transition: {
                    ...state.transition,
                    middle: state.transition.middle ? state.transition.middle.concat([item]) : [item]
                }
            };

        case generatorConstants.CLEAR_TRANSITION:
            return{
                ...state,
                transition: {
                    ...state.transition,
                    middle: []
                }
            };

        case generatorConstants.CHANGE_CURRENT_INDEX:
            return {
                ...state,
                currentIndex: action.index
            };

        default:
            return state;
    }
}

const initialGeneratorConfigState =
    {
        webglAvailable: false,
        webglDisabled: false,
        remoteComputing: false,
        transitionCount: 9,
    };

export function generatorConfig(state = initialGeneratorConfigState, action) {
    switch (action.type) {
        case generatorConstants.SET_TRANSITION_COUNT:
            return {
                ...state,
                transitionCount: action.value,
            }
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
        case generatorConstants.REMOTE_COMPUTING:
            return {
                ...state,
                remoteComputing: action.value
            };
        case generatorConstants.SET_COUNT:
            return {
                ...state,
                count:action.value
            };
        default:
            return state
    }
}