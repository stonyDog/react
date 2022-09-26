//import React from 'react';
import React, { useEffect, useState } from "react";
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
  const [xIsNext, setXIsNext] = useState(true);
  const [boardInfo, setBoardInfo] = useState({
    boardSize: 8,
    squares: Array.from(Array(8), () => new Array(8).fill(null)),
  });
  
  //下記の処理が初回レンダリング後に読みだされる
  //石の初期配置
  useEffect(() => {
    const squareArr = boardInfo.squares.slice();
    squareArr[3][3] ="X";
    squareArr[3][4] ="O";
    squareArr[4][3] ="O";
    squareArr[4][4] ="X";
    setBoardInfo({
      ...boardInfo,
      squares:squareArr})
  }, []);

  //石の変更処理
  

  function handleClick(i, j) {
    const squareArr = boardInfo.squares.slice();
    //if (calculateWinner(squares) || squares[i][j]) {
    if (boardInfo.squares[i][j]) {
      return;
    }

    squareArr[i][j] = xIsNext ? "X" : "O";
    console.log(boardInfo.squares);
    setBoardInfo({ ...boardInfo, squares: squareArr });
    setXIsNext(!xIsNext);
  }

  function renderSquare(i, j) {
    return (
      <Square
        value={boardInfo.squares[i][j]}
        onClick={() => handleClick(i, j)}
      />
    );
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
    for (let i = 0; i < boardInfo.boardSize; i++) {
      const tempList = [];
      for (let j = 0; j < boardInfo.boardSize; j++) {
        tempList.push(renderSquare(i, j));
      }
      list.push(<div className="board-row">{tempList}</div>);
    }
    return list;
  } //盤面の作成

  //この更新方法では、盤面を初期設定以上に広げることができない
  //要修正
  //初回レンダリング時のみ、変数が初期化されるため
  //下記関数が読みだされる毎に、変数を初期化するように修正
  const changeBoardSize = (e) => {
    e.preventDefault();
    setBoardInfo({
      ...boardInfo,
      boardSize: e.target.value,
      ...boardInfo,
      squares: Array.from(Array(e.target.value), () =>
        new Array(e.target.value).fill(null)
      ),
    });
  };

  return (
    <div>
      <form>
        {/*現在ボードサイズを変更できる機能は使用できない */}
        {/*<input type="number" value={boardInfo.boardSize} onChange={changeBoardSize} />*/}
        <input type="number" />
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
