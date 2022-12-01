import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from 'redux';
import thunk from 'redux-thunk';
import reducers from './Reducers/Index';
import Reactotron from '../../ReactotronConfig';

const middlewares = [thunk];

const store = createStore(
  reducers,
  compose(applyMiddleware(...middlewares), Reactotron.createEnhancer()),
);

export default store;
