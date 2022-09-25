//import React from 'react';
import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

function Square(props) {
  return (
    <button className="square" onClick={() => props.onClick()}>
      {props.value}
    </button>
  );
}

function Board() {
  const [boardSize, setBoardSize] = useState(8);
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(
    Array.from(Array(boardSize), () => new Array(boardSize).fill(null))
  );

  function handleClick(i, j) {
    const squareArr = squares.slice();
    //if (calculateWinner(squares) || squares[i][j]) {
    if (squares[i][j]) {
      return;
    }

    squareArr[i][j] = xIsNext ? "X" : "O";
    setSquares(squareArr);
    setXIsNext(!xIsNext);
  }

  function renderSquare(i, j) {
    return <Square value={squares[i][j]} onClick={() => handleClick(i, j)} />;
  }

  function playerLog() {
    //const winner = calculateWinner(squares);
    const winner = "";
    const log = winner
      ? "Winner: " + winner
      : "Next player: " + (xIsNext ? "X" : "O");
    return log;
  }

  //盤面の作成
  function makeBoard() {
    const list = [];
    for (let i = 0; i < boardSize; i++) {
      //一行ごとに、square読みだす
      const tempList = [];
      for (let j = 0; j < boardSize; j++) {
        tempList.push(renderSquare(i, j));
      }
      list.push(<div className="board-row">{tempList}</div>);
    }
    return list;
  } //盤面の作成

  //この更新方法では、盤面を初期設定以上に広げることができない
  //要修正
  const changeBoardSize = (e) => {
    e.preventDefault();
    setBoardSize(e.target.value);
  };

  return (
    <div>
      <form>
        <input type="number" value={boardSize} onChange={changeBoardSize} />
      </form>

      <div className="status">
        <p>{playerLog()}</p>
      </div>

      {makeBoard()}
    </div>
  );
}

function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
      <div className="game-info">
        <div>{/* status */}</div>
        <ol>{/* TODO */}</ol>
      </div>
    </div>
  );
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);

/*
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
}*/
