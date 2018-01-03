import {webglConstants, generatorConstants} from '../_constants';


export const generatorAction = {
    changeGeneratorModel,
    setGeneratorOptions,
    resetGeneratorOptions,
    fixGeneratorOptions,
    setGeneratorInput,
    appendResult,
    modelOptionChange,
    setTransitionStart,
    setTransitionEnd,
    appendTransitionMiddle,
    changeCurrentIndex,
};

export const generatorConfigAction = {
    setWebGLAvailability,
    enableWebGL,
    disableWebGL,
    setRemoteComputing
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

function setRemoteComputing(value){
    return { type: generatorConstants.REMOTE_COMPUTING, value}
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

function setGeneratorInput(input) {
    return { type: generatorConstants.SET_INPUT, input}
}

function appendResult(result, options, appendResult=false) {
    return { type: generatorConstants.APPEND_RESULT, result, options, appendResult}
}

function modelOptionChange(key, random, value){
    return { type: generatorConstants.CHANGE_MODEL_OPTION, key, random, value}
}

function setTransitionStart(result, input) {
    return { type: generatorConstants.SET_TRANSITION_START, result, input}
}

function setTransitionEnd(result, input) {
    return { type: generatorConstants.SET_TRANSITION_END, result, input}
}

function appendTransitionMiddle(result, input) {
    return { type: generatorConstants.APPEND_TRANSITION_MIDDLE, result, input}
}

function changeCurrentIndex(index) {
    return { type: generatorConstants.CHANGE_CURRENT_INDEX, index}
}
