import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { default as apiService } from '../middleware/apiService';
import * as reducers from '../ducks';

export default function configureStore() {
  const rootReducer = combineReducers(reducers);

  return createStore(
    rootReducer,
    applyMiddleware(
      apiService,
      thunkMiddleware,
    ),
  );
}