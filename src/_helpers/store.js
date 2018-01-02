import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../_reducers';
import thunk from 'redux-thunk';

export const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);