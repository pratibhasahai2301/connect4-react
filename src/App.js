import {useState, useEffect} from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import Poetry from "./views/components/poetry";
import {Undo} from "./views/components/undo";
import {Connect4} from "./views/components/connect4";

const GRID_WIDTH = 6;
const GRID_HEIGHT = 5;
const PLAYER1 = 'Player1';
const PLAYER2 = 'Player2';
const PLAYER1_IMAGE = 'http://giphygifs.s3.amazonaws.com/media/jQS9YkJXofyeI/giphy.gif';
const PLAYER2_IMAGE = 'https://media.giphy.com/media/5kFbMBOEdWjg1nItoG/giphy.gif';
function App() {
  const [undo, setUndo] = useState(false);
  const [moves, setMoves] = useState([]);
  const [moveHappened, setMoveHappened] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState('');
  const [board, setBoard] = useState([]);
  const [message, setMessage] = useState('');
  const [boardInitialize, setBoardInitialize] = useState(true);

  useEffect(() => {
    initBoard();
  }, []);

  const initBoard = () => {
    let board = [];
    for (let row = 0; row < GRID_WIDTH; row++) {
      let row = [];
      for (let col = 0; col < GRID_HEIGHT; col++) {
        row.push({});
      }
      board.push(row);
    }

    setBoard(board);
    setBoardInitialize(true);
    setCurrentPlayer(PLAYER1);
    setGameOver(false);
    setMessage('');
    setMoves([]);
  }

  const play = (col) => {
    setBoardInitialize(false);
    if (!gameOver) {
      let boardObj = [...board];
      for (let row = GRID_WIDTH - 1; row >= 0; row--) {
        if (Object.keys(boardObj[row][col]).length === 0) {
          boardObj[row][col] = {
            player: currentPlayer,
            imageLink: currentPlayer === PLAYER1 ?
              PLAYER1_IMAGE :
              PLAYER2_IMAGE
          };
          const movesIm = [...moves];
          movesIm.push([row, col]);
          setMoves(movesIm);
          setMoveHappened(true);
          break;
        }
      }

      // Check status of board
      let result = checkAll(boardObj);
      if (result && (result.player === PLAYER1 || result.player === PLAYER2)) {
        setGameOver(true);
        setBoard(boardObj);
        setMessage(`${result.player} wins`);
        setMoves([]);
      } else if (result === 'draw') {
        setGameOver(true);
        setBoard(boardObj);
        setMessage(`The match is draw`);
      } else {
        setBoard(boardObj);
        setCurrentPlayer(togglePlayer());
      }
    } else {
      setMessage(`Game over. Please start a new game.`);
    }
  }

  const onPoetryLoad = () => {
    setMoveHappened(false);
  }

  const togglePlayer = () => {
    return (currentPlayer === PLAYER1) ? PLAYER2 : PLAYER1;
  }

  const checkVertical = (board) => {
    for (let row = 3; row < GRID_WIDTH; row++) {
      for (let col = 0; col < GRID_HEIGHT; col++) {
        if (Object.keys(board[row][col]).length !== 0) {
          if (board[row][col].player === board[row - 1][col].player &&
            board[row][col].player === board[row - 2][col].player &&
            board[row][col].player === board[row - 3][col].player) {
            return board[row][col];
          }
        }
      }
    }
  }

  const checkHorizontal = (board) => {
    for (let row = 0; row < GRID_WIDTH; row++) {
      for (let col = 0; col < 2; col++) {
        if (Object.keys(board[row][col]).length !== 0) {
          if (board[row][col].player === board[row][col + 1].player &&
            board[row][col].player === board[row][col + 2].player &&
            board[row][col].player === board[row][col + 3].player) {
            return board[row][col];
          }
        }
      }
    }
  }

  const checkDiagonalRight = (board) => {
    for (let row = 3; row < GRID_WIDTH; row++) {
      for (let col = 0; col < 2; col++) {
        if (Object.keys(board[row][col]).length !== 0) {
          if (board[row][col].player === board[row - 1][col + 1].player &&
            board[row][col].player === board[row - 2][col + 2].player &&
            board[row][col].player === board[row - 3][col + 3].player) {
            return board[row][col];
          }
        }
      }
    }
  }

  const checkDiagonalLeft = (board) => {
    for (let row = 3; row < GRID_WIDTH; row++) {
      for (let col = 3; col < GRID_HEIGHT; col++) {
        if (Object.keys(board[row][col]).length !== 0) {
          if (board[row][col].player === board[row - 1][col - 1].player &&
            board[row][col].player === board[row - 2][col - 2].player &&
            board[row][col].player === board[row - 3][col - 3].player) {
            return board[row][col];
          }
        }
      }
    }
  }

  const checkDraw = (board) => {
    for (let row = 0; row < GRID_WIDTH; row++) {
      for (let col = 0; col < GRID_HEIGHT; col++) {
        if (Object.keys(board[row][col]).length === 0) {
          return null;
        }
      }
    }

    return 'draw';
  }

  const checkAll = (board) => {
    return checkVertical(board) || checkDiagonalRight(board) || checkDiagonalLeft(board) || checkHorizontal(board) || checkDraw(board);
  }

  const onUndoClick = () => {
    setUndo(true);
    setMoveHappened(false);
    const movesIm = [...moves];
    const boardsObj = [...board];
    if (!gameOver && movesIm.length) {
      const lastMove = movesIm.pop();
      boardsObj[lastMove[0]][lastMove[1]] = {};
      setBoard(boardsObj);
      setMoves(movesIm);
      setMessage('');
    }
  }

  const onPoetryUndo = () => {
    setUndo(false);
  }

  const handleNewClick = () => {
    initBoard();
  }

  return (
    <div className="container m-5 w-100 h-100">
      <p className="h3 mb-3">Connect4</p>
      {
        message && <div className="alert alert-success"
                        role="alert">
          { message }
        </div>
      }
      <div className="row">
        <div className="col-md-7">
          <Connect4 board={board}
                    play={play}/>
        </div>
        <div className="col-md-5">
          <div className="button-container d-flex">
            <button className="btn btn-primary mr-3"
                    data-testid="button-new"
                    onClick={handleNewClick}>New</button>
            <Undo onUndo={onUndoClick}
                  undoDisabled={!moves.length}/>
          </div>
          <Poetry undo={undo}
                  clear={boardInitialize}
                  moveHappened={moveHappened}
                  onPoetryLoad={onPoetryLoad}
                  onUndo={onPoetryUndo}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
