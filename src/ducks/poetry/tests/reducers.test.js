import reducer from '../reducers';
import * as types from '../types';

const poetry = [
  {
    title: "title1",
    author: "author1",
    lines: [
      'line1',
      'line2',
      'line3',
      'line4'
    ],
    linecount: 4
  },
  {
    title: "title2",
    author: "author2",
    lines: [
      'line1',
      'line2',
      'line3',
      'line4'
    ],
    linecount: 4
  },
  {
    title: "title3",
    author: "author3",
    lines: [
      'line1',
      'line2',
      'line3',
      'line4'
    ],
    linecount: 4
  },
  {
    title: "title4",
    author: "author4",
    lines: [
      'line1',
      'line2',
      'line3',
      'line4'
    ],
    linecount: 4
  },
];

describe('poetryRequested reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      poetryEntities: {
        poetry: [],
        loading: false,
        error: {}
      }
    })
  })

  it('should handle poetryRequested', () => {
    expect(
      reducer({
        poetryEntities: {
          poetry: [],
          loading: false,
          error: {}
        }
      }, {
        type: types.poetryRequested,
      })
    ).toEqual({
      poetryEntities: {
        poetry: [],
        loading: true,
        error: {}
      }
    })

    expect(
      reducer({
          poetryEntities: {
            poetry: [],
            loading: true,
            error: {}
          }
        },
        {
          type: types.poetryReceived,
          payload: poetry
        }
      )
    ).toEqual({
      poetryEntities: {
        poetry,
        loading: false,
        error: {}
      }
    })
  })
})