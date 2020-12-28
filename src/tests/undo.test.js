import React from 'react';
import { render, fireEvent, cleanup } from '../mocks/test-utils';
import {Undo} from "../views/components/undo";

afterEach(() => {
  cleanup();
});

test("Undo button should call function on click", () => {
  const mockFn = jest.fn();
  const { getByTestId } = render(<Undo onUndo={mockFn}
                                       undoDisabled={false}/>);
  const button = getByTestId("button-undo");

  fireEvent.click(button);
  expect(mockFn).toHaveBeenCalled();
});

test("Undo button not should call function on click if disable", () => {
  const mockFn = jest.fn();
  const { getByTestId } = render(<Undo onUndo={mockFn}
                                       undoDisabled={true}/>);
  const button = getByTestId("button-undo");

  fireEvent.click(button);
  expect(mockFn).not.toHaveBeenCalled();
});