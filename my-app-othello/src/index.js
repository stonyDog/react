//import React from 'react';
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const checkVector = [
  [1, 0],
  [1, 1],
  [0, 1],
  [-1, 1],
  [-1, 0],
  [-1, -1],
  [0, -1],
  [1, -1],
];

function Square(props) {
  return (
    <button className="square" onClick={() => props.onClick()}>
      {props.value}
    </button>
  );
}

function Board() {
  const [turnInfo, setTurnInfo] = useState({
    xIsNext: false,
    x_coord: 0,
    y_coord: 0,
  });
  const [boardInfo, setBoardInfo] = useState({
    boardSize: 8,
    squares: Array.from(Array(8), () => new Array(8).fill(null)),
  });
  const [nextBoardInfo, setNextBoardInfo] = useState({
    changeStoneList: Array.from(new Array(8), () => {
      return Array.from(new Array(8), () => new Array(8).fill(0));
    }),
  });
  
  const [playerLog, setPlayerLog] = useState("Next player: X");

  //初回レンダリング時に実行
  useEffect(() => {
    //石の初期配置
    const squareArr = boardInfo.squares.slice();
    squareArr[3][3] = "X";
    squareArr[3][4] = "O";
    squareArr[4][3] = "O";
    squareArr[4][4] = "X";
    setBoardInfo({
      ...boardInfo,
      squares: squareArr,
    });
  }, [boardInfo.boardSize]);

  //毎レンダリング時に実行
  useEffect(() => {
    let squareArr = boardInfo.squares.slice();
    let winner =null;
    //挟まれた石ひっくり返し
    squareArr = changeStone(
      turnInfo.xIsNext,
      turnInfo.x_coord,
      turnInfo.y_coord,
      squareArr,
      nextBoardInfo.changeStoneList
    );
    //console.log(squareArr);

    //石の変更箇所探索 スキップのチェックも行う
    const nextBoardArr = placedNextStones(
      turnInfo.xIsNext,
      boardInfo.boardSize,
      squareArr
    );
    //[0]:石を置ける箇所+現在の石リスト、[1]:石を置いた際の変更数リスト、[2]:〇の数、[3]:×の数、[4]スキップEn
    

    //石の変更箇所提示
    setBoardInfo({
      ...boardInfo,
      squares: nextBoardArr[0],
    });
    setNextBoardInfo({
      changeStoneList: nextBoardArr[1]
    });
    
    
    //勝敗判定
    if(nextBoardArr[2]===0 || nextBoardArr[3]===0 || nextBoardArr[2]+nextBoardArr[3]===boardInfo.boardSize*boardInfo.boardSize ){
      if(nextBoardArr[3]>nextBoardArr[2]){
        winner= "X";
      }else if(nextBoardArr[3]<nextBoardArr[2]){
        winner= "O";
      }else{
        winner= "X and O";
      }
    }
    //スキップ処理判定
    else if(nextBoardArr[2]!==0 && nextBoardArr[3]!==0 && nextBoardArr[4]===true){
      //強制ターン変更
      window.alert('置くことができません。ターンをスキップします')
      setTurnInfo({
        ...turnInfo,
        xIsNext: !turnInfo.xIsNext,
      });
    }

    //player log生成
    setPlayerLog(makePlayerLog(winner,turnInfo.xIsNext));

  }, [turnInfo.xIsNext, boardInfo.boardSize]);

  //石の変更処理
  function handleClick(i, j) {
    const squareArr = boardInfo.squares.slice();
    //if (calculateWinner(squares) || squares[i][j]) {

    //石を置けない箇所に置いた場合は無効
    if (boardInfo.squares[i][j] !== "△") {
      return;
    }

    squareArr[i][j] = turnInfo.xIsNext ? "X" : "O";
    setBoardInfo({ ...boardInfo, squares: squareArr });
    setTurnInfo({
      xIsNext: !turnInfo.xIsNext,
      x_coord: i,
      y_coord: j,
    });
  }

  function renderSquare(i, j) {
    return (
      <Square
        value={boardInfo.squares[i][j]}
        onClick={() => handleClick(i, j)}
        key={`${i},${j}`}
      />
    );
  }

  //盤面の作成
  function makeBoard() {
    const list = [];
    for (let i = 0; i < boardInfo.boardSize; i++) {
      const tempList = [];
      for (let j = 0; j < boardInfo.boardSize; j++) {
        tempList.push(renderSquare(i, j));
      }
      list.push(
        <div className="board-row" key={i}>
          {" "}
          {tempList}
        </div>
      );
    }
    return list;
  } //盤面の作成

  //盤面サイズ変更
  const changeBoardSize = (e) => {
    e.preventDefault();
    const newBoardSize = Number(e.target.value);
    setBoardInfo({
      boardSize: newBoardSize,
      squares: Array.from(Array(newBoardSize), () =>
        new Array(newBoardSize).fill(null)
      ),
    });
  };//盤面サイズ変更

  return (
    <div>
      <form>
        {/*盤面数入力box */}
        <input
          type="number"
          value={boardInfo.boardSize}
          onChange={changeBoardSize}
        />
      </form>

      {/*playerLogの表示*/}
      <div className="status">
        <p>{playerLog}</p>
      </div>

      {/*ボードの表示*/}
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

//勝敗判定
function calculateWinner(boardSize,squares) {
  const squareArr = squares.slice();
  let xCount=0;
  let nullCount=0;
  let oCount=0;
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      switch(squareArr[i][j]){
        case "O":
          oCount++;
          break;
        case "X":
          xCount++;
          break;
        case null:
          nullCount++;
          break;
        default:
          break;
      }
    }
  }
  //勝敗判定
  if(nullCount===0 || xCount===0 || oCount===0){
    if(xCount>oCount){
      return "X";
    }else if(xCount>oCount){
      return "O";
    }else{
      return "X and O";
    }
  }else{
    return null;
  }
}

//石のひっくり返し
function changeStone(xIsNext, x, y, squares, changeStoneList) {
  const squareArr = squares.slice();
  console.log(squareArr);
  for (let k = 0; k < 8; k++) {
    for (let l = 1; l <= changeStoneList[x][y][k]; l++) {
      squareArr[x + l * checkVector[k][0]][y + l * checkVector[k][1]] = !xIsNext
        ? "X"
        : "O";
    }
  }
  console.log(squareArr);
  return squareArr;
}

//手番ログ生成
function makePlayerLog(winner,xIsNext) {
  const log = (winner!=null)    ? "Winner: " + winner
    : "Next player: " + (xIsNext ? "X" : "O");
  return log;
}
//石の変更箇所明示
function placedNextStones(xIsNext, boardSize, squares) {
  const preSquare = xIsNext ? "O" : "X";
  const nextSquare = xIsNext ? "X" : "O";
  let oCount =0;
  let xCount =0;
  let skipEn =true;
  let changeStoneList = Array.from(new Array(boardSize), () => {
    return Array.from(new Array(boardSize), () => new Array(8).fill(0));
  });

  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      //石おける箇所情報の初期化
      if (squares[i][j] === "△") {
        squares[i][j] = null;
      }
      //空欄チェック
      if (squares[i][j] === null) {
        for (let k = 0; k < 8; k++) {
          let putSquareEn = false;
          let l = 1;
          while (
            0 <= i + l * checkVector[k][0] &&
            0 <= j + l * checkVector[k][1] &&
            i + l * checkVector[k][0] < boardSize &&
            j + l * checkVector[k][1] < boardSize
          ) {
            //チェンジできない場合の処理
            if ( squares[i + l * checkVector[k][0]][j + l * checkVector[k][1]] === null ||
                 squares[i + l * checkVector[k][0]][j + l * checkVector[k][1]] === "△" ||
                (putSquareEn === false && squares[i + l * checkVector[k][0]][j + l * checkVector[k][1]] === nextSquare)) 
            {
              break;
            } else if (squares[i + l * checkVector[k][0]][j + l * checkVector[k][1]] === preSquare) 
            {
              putSquareEn = true;
            } else if (putSquareEn === true && squares[i + l * checkVector[k][0]][j + l * checkVector[k][1]] === nextSquare) 
            {
              squares[i][j] = "△";
              skipEn=false;
              changeStoneList[i][j][k] = l - 1;
            }
            l++;
          }
        }
      
      }
      //石の数をカウント
      else{
        if (squares[i][j] === "O") {
          oCount++;
        }else if(squares[i][j] ===  "X"){
          xCount++;
        }
      }
    }
  }
  return [squares, changeStoneList,oCount,xCount,skipEn];
}

