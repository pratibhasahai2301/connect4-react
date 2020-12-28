import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import {combineReducers, createStore} from 'redux';
import { Provider } from 'react-redux';
import * as reducers from '../ducks';

const rootReducer = combineReducers(reducers);

function render(
  ui,
  {
    initialState,
    store = createStore(rootReducer, initialState),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

// re-export everything
export * from '@testing-library/react';
// override render method
export { render };