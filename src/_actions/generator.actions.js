import {webglConstants, generatorConstants} from '../_constants';


export const generatorAction = {
    changeGeneratorModel,
    setGeneratorOptions,
    resetGeneratorOptions,
    fixGeneratorOptions,
    appendResult,
};

export const generatorConfigAction = {
    setWebGLAvailability,
    enableWebGL,
    disableWebGL
};

function setWebGLAvailability(value){
    return { type: webglConstants.CHANGE_AVAILABILITY, value}
}

function enableWebGL(){
    return { type: webglConstants.CHANGE_VISIBILITY, value:true}
}

function disableWebGL(){
    return { type: webglConstants.CHANGE_VISIBILITY, value:false}
}

function changeGeneratorModel(model){
    return { type: generatorConstants.CHANGE_MODEL, model}
}

function setGeneratorOptions(options){
    return { type: generatorConstants.SET_OPTIONS, options}
}

function resetGeneratorOptions(){
    return { type: generatorConstants.RESET_OPTIONS}
}

function fixGeneratorOptions(){
    return { type: generatorConstants.FIX_OPTIONS}
}

function  appendResult(result, appendResult=false) {
    return { type: generatorConstants.APPEND_RESULT, result, appendResult}
}

function modelOptionCH