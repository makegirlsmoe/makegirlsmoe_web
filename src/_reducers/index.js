import { combineReducers } from 'redux';
import { selectLocale } from './locale.reducers';
import { twitter } from './twitter.reducers';
import { generator } from './generator.reducers';

const rootReducer = combineReducers({
    selectLocale,
    generator,
    twitter

});

export default rootReducer;