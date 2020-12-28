import React from 'react';

export const Connect4 = (props) => {
  const { play, board } = props;
  const getTestId = (cell) => {
    return cell && cell.player ? `board-cell-${cell.player}` : 'board-cell';
  }
  return (
    <>
      {
        board.map((row, i) => (
          <div key={i}
               className="d-flex w-100 justify-content-end"
               data-testid='board-row'>
            {
              row.map((cell, idx) => (
                <div key={idx}
                     className="cell"
                     data-testid={getTestId(cell)}
                     onClick={() => play(idx)}>
                  <div className="circle">
                    {
                      (cell && cell.imageLink) && <img alt={cell.player}
                                                       src={cell.imageLink}
                                                       className="image-link"/>
                    }
                  </div>
                </div>
              ))
            }
          </div>
        ))
      }
    </>
  );
}
