import {createStore, applyMiddleware} from 'redux'
import reducer from '../reducer'
import logger from '../middlewares/logger'
import randomId from '../middlewares/randomId'
import thunk from 'redux-thunk'
const enhancer = applyMiddleware(thunk, logger, randomId)
const store = createStore(reducer, {}, enhancer);

window.store = store;
export default store;

