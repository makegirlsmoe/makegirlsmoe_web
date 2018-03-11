import { combineReducers } from 'redux';
import { selectLocale } from './locale.reducers';
import { twitter } from './twitter.reducers';
import { generator, generatorConfig } from './generator.reducers';
import { authentication, userRegister, userAddToFavorite, userLibrary } from './user.reducers';

const rootReducer = combineReducers({
    selectLocale,
    generator,
    generatorConfig,
    twitter,
    authentication,
    userRegister,
    userAddToFavorite,
    userLibrary
});

export default rootReducer;