import {webglConstants, generatorConstants} from '../_constants';


export const generatorAction = {
    changeGeneratorModel,
    setGeneratorOptions,
    resetGeneratorOptions,
    fixGeneratorOptions,
    fixNoiseOption,
    setNoiseValue,
    perturbNoise,
    setGeneratorInput,
    appendResult,
    modelOptionChange,
    setTransitionStart,
    setTransitionEnd,
    clearTransition,
    appendTransitionMiddle,
    changeCurrentIndex,
};

export const generatorConfigAction = {
    setWebGLAvailability,
    enableWebGL,
    disableWebGL,
    setRemoteComputing,
    setCount,
    setTransitionCount,
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

function fixNoiseOption(){
    return { type: generatorConstants.FIX_NOISE_OPTION}
}

function setGeneratorInput(input) {
    return { type: generatorConstants.SET_INPUT, input}
}

function setNoiseValue(value){
    return { type: generatorConstants.SET_NOISE_VALUE, value}
}

function perturbNoise(value, scale) {
    let newValue = value.map((v)=>{
        let vv = v.slice();
        vv[1] = vv[1] + Math.random() * scale;
        vv[1] = vv[1] - Math.floor(vv[1]);
        return vv
    });
    //console.log(value);
    //console.log(newValue);
    return { type: generatorConstants.SET_NOISE_VALUE, value:newValue}
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

function setCount(value) {
    return { type: generatorConstants.SET_COUNT, value}
}

function setTransitionCount(value) {
    return { type: generatorConstants.SET_TRANSITION_COUNT, value}
}

function clearTransition() {
    return { type: generatorConstants.CLEAR_TRANSITION}
}
