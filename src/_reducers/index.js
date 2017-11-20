import { combineReducers } from 'redux';
import { selectLocale } from './locale.reducers';


const rootReducer = combineReducers({
    selectLocale
});

export default rootReducer;