import { useState } from 'react';

function Square({ value, onSquareClick, styleColour }) {
  return (
    <button className="square" onClick={onSquareClick} style={{border: styleColour}}>{value}</button>
  );
}

function Board({ xIsNext, squares, onPlay, allowed, number, gameOver, boardChange }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i] || (allowed != number && allowed != 10) || gameOver) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    if (calculateWinner(nextSquares)) {
      boardChange(number);
    }
    onPlay(nextSquares, number, i);
  }

  const winner = calculateWinner(squares);
  const style = (allowed != number && allowed != 10) ? "1px solid #999" : "1px solid #f00";

  return (
    <div className="small-board">
      <div className="winner-text">{winner}</div>
      <div className="box-frame">
        <div className="board-row">
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} styleColour={style} />
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} styleColour={style} />
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} styleColour={style} />
        </div>
        <div className="board-row">
          <Square value={squares[3]} onSquareClick={() => handleClick(3)} styleColour={style} />
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} styleColour={style} />
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} styleColour={style} />
        </div>
        <div className="board-row">
          <Square value={squares[6]} onSquareClick={() => handleClick(6)} styleColour={style} />
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} styleColour={style} />
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} styleColour={style} />
        </div>
      </div>
    </div>
  );
}

export default function Game() {
  const [currentSquares, setCurrentSquares] = useState(Array(81).fill(null));
  const [overallBoard, setOverallBoard] = useState(Array(9).fill(null));
  const [allowedBox, setAllowedBox] = useState(10);
  const [xIsNext, setXIsNext] = useState(true);

  function handlePlay(smallBoardSquares, number, position) {
    const nextSquares = currentSquares.slice();
    Array.prototype.splice.apply(nextSquares, [number * 9, smallBoardSquares.length].concat(smallBoardSquares));
    setCurrentSquares(nextSquares);
    setXIsNext(!xIsNext);
    setAllowedBox(overallBoard[position] ? 10 : position);
  }

  function overallBoardChange(number) {
    const nextOverallBoard = overallBoard.slice();
    if (xIsNext) {
      nextOverallBoard[number] = 'X';
    } else {
      nextOverallBoard[number] = 'O';
    }
    setOverallBoard(nextOverallBoard);
  }

  const winner = calculateWinner(overallBoard);
  let status;
  let gameOver = false;
  if (winner) {
    status = 'Winner: ' + winner;
    gameOver = true;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <div className="game">
      <div className="game-board">
        <div className="status">{status}</div>
        <div className="mini-board">
          <Board xIsNext={xIsNext} squares={currentSquares.slice(0, 9)} onPlay={handlePlay} allowed={allowedBox} number={0} gameOver={gameOver} boardChange={overallBoardChange} />
          <Board xIsNext={xIsNext} squares={currentSquares.slice(27, 36)} onPlay={handlePlay} allowed={allowedBox} number={3} gameOver={gameOver} boardChange={overallBoardChange} />
          <Board xIsNext={xIsNext} squares={currentSquares.slice(54, 63)} onPlay={handlePlay} allowed={allowedBox} number={6} gameOver={gameOver} boardChange={overallBoardChange} />
        </div>
        <div className="mini-board">
          <Board xIsNext={xIsNext} squares={currentSquares.slice(9, 18)} onPlay={handlePlay} allowed={allowedBox} number={1} gameOver={gameOver} boardChange={overallBoardChange} />
          <Board xIsNext={xIsNext} squares={currentSquares.slice(36, 45)} onPlay={handlePlay} allowed={allowedBox} number={4} gameOver={gameOver} boardChange={overallBoardChange} />
          <Board xIsNext={xIsNext} squares={currentSquares.slice(63, 72)} onPlay={handlePlay} allowed={allowedBox} number={7} gameOver={gameOver} boardChange={overallBoardChange} />
        </div>
        <div className="mini-board">
          <Board xIsNext={xIsNext} squares={currentSquares.slice(18, 27)} onPlay={handlePlay} allowed={allowedBox} number={2} gameOver={gameOver} boardChange={overallBoardChange} />
          <Board xIsNext={xIsNext} squares={currentSquares.slice(45, 54)} onPlay={handlePlay} allowed={allowedBox} number={5} gameOver={gameOver} boardChange={overallBoardChange} />
          <Board xIsNext={xIsNext} squares={currentSquares.slice(72, 81)} onPlay={handlePlay} allowed={allowedBox} number={8} gameOver={gameOver} boardChange={overallBoardChange} />
        </div>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
