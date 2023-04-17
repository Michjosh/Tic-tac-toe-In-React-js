import React from 'react';
import './GameBoard.css';

class GameBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      player1Turn: true,
      computerPlayer: false,
      winner: null
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    if (this.state.winner || squares[i]) {
      return;
    }
    squares[i] = this.state.player1Turn ? 'M' : 'O';
    const winner = calculateWinner(squares);
    this.setState({
      squares: squares,
      player1Turn: !this.state.player1Turn,
      winner: winner
    });
    if (!winner && !this.state.player1Turn && this.state.computerPlayer) {
      setTimeout(() => {
        this.computerPlay();
      }, 500);
    }
  }

  computerPlay() {
    const squares = this.state.squares.slice();
    let move = Math.floor(Math.random() * 9);
    while (squares[move]) {
      move = Math.floor(Math.random() * 9);
    }
    squares[move] = 'O';
    const winner = calculateWinner(squares);
    this.setState({
      squares: squares,
      player1Turn: true,
      winner: winner
    });
  }

  renderSquare(i) {
    return (
      <button className="square" onClick={() => this.handleClick(i)}>
        {this.state.squares[i]}
      </button>
    );
  }

  handleModeChange(event) {
    const value = event.target.value;
    this.setState({
      computerPlayer: value === 'computer'
    });
  }

  resetGame() {
    this.setState({
      squares: Array(9).fill(null),
      player1Turn: true,
      winner: null
    });
  }

  render() {
    let status;
    if (this.state.winner) {
      status = 'Winner: ' + this.state.winner;
    } else if (!this.state.squares.includes(null)) {
      status = "It's a draw!";
    } else {
      status = 'Next player: ' + (this.state.player1Turn ? 'M' : 'O');
    }
    return (
      <div className='Game'>
        <div className='status-box'>
        <div className="status">{status}</div>
        </div>
        <div className="game-board">   
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
        <div className="game-mode">
            <div className='human-box'>
            <label className='human'>
            <input  type="radio" name="mode" value="human" checked={!this.state.computerPlayer} onChange={(event) => this.handleModeChange(event)} />
            Play With human
          </label>
            </div>
            <div className='computer-box'>
            <label className='computer'>
            <input type="radio" name="mode" value="computer" checked={this.state.computerPlayer} onChange={(event) => this.handleModeChange(event)} />
            Play
            With Robot
          </label>
            </div>
        </div>
        <button className="reset-button" onClick={() => this.resetGame()}>Reset Game</button>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default GameBoard;
