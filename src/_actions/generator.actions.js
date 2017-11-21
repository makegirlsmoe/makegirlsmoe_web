import {webglConstants} from '../_constants';

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