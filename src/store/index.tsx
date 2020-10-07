import {createStore,compose,applyMiddleware} from 'redux';
import {reducers} from './reducer';
const ehranceCompose = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||compose;
const store = createStore(reducers,ehranceCompose(applyMiddleware()))
export default store;

