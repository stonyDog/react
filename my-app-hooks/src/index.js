//import React from 'react';
import React, { useState } from 'react'
import ReactDOM from 'react-dom/client';
import './index.css';

function Square(props){
	
	return (
		<button 
			className="square" 
			onClick={()=>props.onClick()}
		>
			{props.value}
		</button>
  	);
}

function Board(){

	const [xIsNext,setXIsNext] = useState(true);
	const [squares,setSquares] = useState(Array(9).fill(null));

	function handleClick(i) {
		const squareArr = squares.slice();
		
		if (calculateWinner(squares) || squares[i]) {
			return;
		}

		squareArr[i] = xIsNext ? 'X' : 'O';
		setSquares(squareArr);
		setXIsNext(!xIsNext);
	}

	function renderSquare(i) {
		return (
			<Square 
				value={squares[i]}
				onClick={() => handleClick(i)}
			/>
		);
	}

	function playerLog(){
		const winner = calculateWinner(squares);
		let playerLog;
		if (winner) {
			playerLog = 'Winner: ' + winner;
		} else {
			playerLog = 'Next player: ' + (xIsNext ? 'X' : 'O');
		}
		return playerLog;
	}
	return(
		
			<div>
				<div className="status">
					<p>
						{playerLog()}
					</p>
				</div>
				<div className="board-row">
					{renderSquare(0)}
					{renderSquare(1)}
					{renderSquare(2)}
				</div>
				<div className="board-row">
					{renderSquare(3)}
					{renderSquare(4)}
					{renderSquare(5)}
				</div>
				<div className="board-row">
					{renderSquare(6)}
					{renderSquare(7)}
					{renderSquare(8)}
				</div>
			</div>
	);

}

function Game(){
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