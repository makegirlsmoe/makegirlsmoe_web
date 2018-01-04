import { combineReducers } from 'redux';
import { selectLocale } from './locale.reducers';
import { twitter } from './twitter.reducers';
import { generator, generatorConfig } from './generator.reducers';
import { authentication, userRegister, userAddToFavorite } from './user.reducers';

const rootReducer = combineReducers({
    selectLocale,
    generator,
    generatorConfig,
    twitter,
    authentication,
    userRegister,
    userAddToFavorite
});

export default rootReducer;