import * as types from '../types';
import { default as poetryActions } from "../actions";

describe('actions', () => {
  it('should create an action to fetch poetry', () => {
    const expectedAction = {
      type: types.poetryRequested,
      meta: {
        onSuccess: types.poetryReceived,
        onError: types.poetryRequestFailed,
        method: 'GET',
        async: true,
        blocking: true
      },
    };
    expect(poetryActions.poetryRequested()).toEqual(expectedAction);
  })
})