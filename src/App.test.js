import React from 'react';
import App from './App';
import {render, fireEvent, cleanup} from './mocks/test-utils';

const GRID_WIDTH = 6;
const GRID_HEIGHT = 5;

const renderApp = () => render(<App/>);

afterEach(() => {
  cleanup();
});

test('renders the snapshot', () => {
  const snapshot = renderApp();
  expect(snapshot).toMatchSnapshot();
});

test('should create an empty board', () => {
  const {getAllByTestId, queryByTestId, getByTestId} = renderApp();
  expect(getAllByTestId('board-row').length).toEqual(GRID_WIDTH);
  expect(getAllByTestId('board-row')[0].children.length).toEqual(GRID_HEIGHT);

  // should not contain any player element
  expect(getAllByTestId('board-row')[0].children).not.toContain(queryByTestId('board-cell-Player1'));
  expect(getAllByTestId('board-row')[0].children).not.toContain(queryByTestId('board-cell-Player2'));

  // should contain buttons
  expect(getByTestId('button-new')).toBeTruthy();
  expect(getByTestId('button-undo')).toBeTruthy();

  // should contain poem section
  expect(getByTestId('poem')).toBeTruthy();
  expect(getByTestId('poem')).not.toContain(queryByTestId('poem-lines'));
});

test('should set board-matrix if the user clicks on a cell', () => {
  const {getAllByTestId, queryByTestId, getByText} = renderApp();
  expect(getAllByTestId('board-row').length).toEqual(GRID_WIDTH);
  expect(getAllByTestId('board-row')[0].children.length).toEqual(GRID_HEIGHT);

  // should not contain any player element
  expect(getAllByTestId('board-row')[0].children).not.toContain(queryByTestId('board-cell-Player1'));
  expect(getAllByTestId('board-row')[0].children).not.toContain(queryByTestId('board-cell-Player2'));

  const childArray = Array.prototype.slice.call(getAllByTestId('board-row')[0].children);
  childArray[0].click();
  // last row should contain the element
  expect(getAllByTestId('board-row')[GRID_WIDTH - 1].children).toContain(queryByTestId('board-cell-Player1'))

  // Another click would be for Player 2
  fireEvent.click(childArray[1]);
  expect(getAllByTestId('board-row')[GRID_WIDTH - 1].children).toContain(queryByTestId('board-cell-Player2'));

  fireEvent.click(childArray[0]);
  fireEvent.click(childArray[1]);
  fireEvent.click(childArray[0]);
  fireEvent.click(childArray[1]);
  fireEvent.click(childArray[0]);
  expect(getAllByTestId('board-cell-Player1').length).toEqual(4);
  expect(getByText('Player1 wins')).toBeTruthy();

  // no further clicks can be done
  fireEvent.click(childArray[1]);
  expect(getAllByTestId('board-cell-Player2').length).toEqual(3);
  expect(getByText('Game over. Please start a new game.')).toBeTruthy();
});