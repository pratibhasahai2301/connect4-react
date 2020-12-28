import * as types from './types';

const poetryRequested = () => {
  return {
    type: types.poetryRequested,
    meta: {
      onSuccess: types.poetryReceived,
      onError: types.poetryRequestFailed,
      method: 'GET',
      async: true,
      blocking: true
    },
  };
};

const poetryActions = {
  poetryRequested
};

export default poetryActions;