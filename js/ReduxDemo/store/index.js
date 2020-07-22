import thunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import reducer from '../reducer';

/**
 * 自定义中间件
 */
const logger = (store) => (next) => (action) => {
  if (typeof action === 'function') {
    console.log('dispatching action');
  } else {
    console.log('dispatching', action);
  }
  const result = next(action);
  console.log('result', result);
  return result;
};

const middleware = [logger, thunk];

const store = createStore(reducer, applyMiddleware(...middleware));

export default store;
