import React from 'react';
import { render, fireEvent, cleanup } from '../mocks/test-utils';
import {Connect4} from "../views/components/connect4";

afterEach(() => {
  cleanup();
});

test("should display given board", () => {
  const mockFn = jest.fn();
  const board = [
    [{}, {}, {}, {}],
    [{}, {}, {}, {}],
    [{}, {}, {}, {}],
    [{}, {}, {}, {}],
    [{}, {}, {}, {}],
  ]
  const { getAllByTestId } = render(<Connect4 board={board} play={mockFn}/>);

  expect(getAllByTestId('board-row').length).toEqual(5);
  expect(getAllByTestId('board-row')[0].children.length).toEqual(4);
});

test("Play function should be called on click of function", () => {
  const mockFn = jest.fn();
  const board = [
    [{}, {}, {}, {}],
    [{}, {}, {}, {}],
    [{}, {}, {}, {}],
    [{}, {}, {}, {}],
    [{}, {}, {}, {}],
  ]
  const { getAllByTestId } = render(<Connect4 board={board} play={mockFn}/>);

  fireEvent.click(getAllByTestId('board-row')[0].children[0]);
  expect(mockFn).toHaveBeenCalled();
});

test("Should set imageLink if provided", () => {
  const mockFn = jest.fn();
  const board = [
    [{}, {}, {}, {}],
    [{}, {}, {}, {}],
    [{}, {}, {}, {}],
    [{player: 'Player2', imageLink: 'https://bit-ly-1'}, {}, {}, {}],
    [{player: 'Player1', imageLink: 'https://bit-ly-1'}, {}, {}, {}],
  ]
  const { getByTestId } = render(<Connect4 board={board} play={mockFn}/>);

  expect(getByTestId('board-cell-Player1')).toBeTruthy();
  expect(getByTestId('board-cell-Player2')).toBeTruthy();
});