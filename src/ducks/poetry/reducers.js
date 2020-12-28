import { combineReducers } from 'redux';
import * as types from './types';

const poetryInitialState = {
  poetry: [],
  loading: false,
  error: {},
};

const poetryReducer = (state = poetryInitialState, action) => {
  switch (action.type) {
    case types.poetryRequested:
      return {
        ...state,
        loading: true,
      };

    case types.poetryReceived:
      return {
        ...state,
        loading: false,
        poetry: action.payload,
        error: {},
      };

    case types.poetryRequestFailed:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return {...state};
  }
};

const reducers = combineReducers({
  poetryEntities: poetryReducer,
});

export default reducers;