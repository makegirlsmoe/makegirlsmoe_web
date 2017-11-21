import { combineReducers } from 'redux';
import { selectLocale } from './locale.reducers';
import { twitter } from './twitter.reducers';
import { generator, generatorConfig } from './generator.reducers';

const rootReducer = combineReducers({
    selectLocale,
    generator,
    generatorConfig,
    twitter

});

export default rootReducer;