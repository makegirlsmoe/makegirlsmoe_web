import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../_reducers';

export const store = createStore(
    rootReducer
);