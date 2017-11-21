import {twitterConstants} from '../_constants';


const initialState={
    visible: false
};

export function twitter(state = initialState, action) {
    switch (action.type) {
        case twitterConstants.CHANGE_VISIBILITY:
            console.log('action');
            console.log(action.value);
            return {
                ...state,
                visible: action.value,
            };
        default:
            return state
    }
}