import { combineReducers } from 'redux';
import { selectLocale } from './locale.reducers';
import { twitter } from './twitter.reducers';
import { generator, generatorConfig } from './generator.reducers';
import { authentication } from './user.reducers';

const rootReducer = combineReducers({
    selectLocale,
    generator,
    generatorConfig,
    twitter,
    authentication
});

export default rootReducer;