import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducers from '../reducers';
const middlewares = [thunk, logger];

const store = createStore(rootReducers, applyMiddleware(...middlewares));

export default store;
