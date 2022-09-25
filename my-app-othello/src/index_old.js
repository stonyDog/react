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

function Board(props) {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(
    Array(props.boardSize ** 2).fill(null)
  );
  const [squareS, setSquareS] = useState(
    Array.from(Array(props.boardSize), () =>
      new Array(props.boardSize).fill(null)
    )
  );
  {
    console.log(squareS);
  }
  function changeSquares(i) {
    //無効入力処理
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    const squareArr = squares.slice();
    //入力箇所の変更
    squareArr[i] = xIsNext ? "X" : "O";

    //挟まれた箇所の変更処理

    //情報の更新
    setSquares(squareArr);
    setXIsNext(!xIsNext);
  }

  function handleClick(i) {
    const squareArr = squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squareArr[i] = xIsNext ? "X" : "O";
    setSquares(squareArr);
    setXIsNext(!xIsNext);
  }

  function renderSquare(i) {
    return <Square value={squares[i]} onClick={() => handleClick(i)} />;
  }

  function playerLog() {
    const winner = calculateWinner(squares);
    let playerLog;
    if (winner) {
      playerLog = "Winner: " + winner;
    } else {
      playerLog = "Next player: " + (xIsNext ? "X" : "O");
    }
    return playerLog;
  }

  //盤面の作成
  function makeBoard() {
    const list = [];
    for (let i = 0; i < props.boardSize; i++) {
      //一行ごとに、square読みだす
      const tempList = [];
      for (let j = 0; j < props.boardSize; j++) {
        tempList.push(renderSquare(props.boardSize * i + j));
      }
      list.push(<div className="board-row">{tempList}</div>);
    }
    return list;
  }//盤面の作成

  return (
    <div>
      <div className="status">
        <p>{playerLog()}</p>
      </div>

      {/*盤面の作成 boardSizeを基に可変*/}
      {makeBoard()}
    </div>
  );
}

function Game() {
  const [boardSize, setBoardSize] = useState(3);

  return (
    <div className="game">
      <div className="game-board">
        <Board boardSize={boardSize} />
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
