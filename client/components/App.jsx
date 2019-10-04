import React from 'react';
import Board from './board.jsx';
import gameUtils from '../utils/game.js';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      board: [
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
      ],
      hlColIndex: null,
      playerTurn: 1,
      gameOver: false,
      result: 'active game'
    };

    this.onColumnMouseIn = this.onColumnMouseIn.bind(this);
    this.onColumnMouseOut = this.onColumnMouseOut.bind(this);
    this.onSlotClick = this.onSlotClick.bind(this);
    this.getMessage = this.getMessage.bind(this);
  }

  onColumnMouseIn(colIndex) {
    this.setState({ hlColIndex: colIndex });
  }

  onColumnMouseOut() {
    this.setState({ hlColIndex: null });
  }

  onSlotClick(colIndex) {
    if (this.state.gameOver) { return; }
    let newBoard = gameUtils.addPiece(this.state.board, colIndex, this.state.playerTurn);

    if (gameUtils.determineBoardFull(newBoard)) {
      this.setState({
        board: newBoard,
        gameOver: true,
        result: 'tie'
      });
      return;
    }

    if (gameUtils.determineWin(newBoard)) {
      this.setState({
        board: newBoard,
        gameOver: true,
        result: gameUtils.determineWin(newBoard)
      })
    }

    this.setState({
      board: newBoard,
      playerTurn: this.state.playerTurn === 1 ? 2 : 1
    });
  }

  getMessage() {
    if (this.state.gameOver && this.state.result === 'tie') {
      return 'Tie game!'
    }

    if (this.state.gameOver && this.state.result === 1) {
      return 'Player One Wins!'
    }

    if (this.state.gameOver && this.state.result === 2) {
      return 'Player Two Wins!'
    }

    if (!this.state.gameOver) {
      return this.state.playerTurn === 1 ?
        'Player One\'s Turn' :
        'Player Two\'s Turn';
    }
  }

  render() {
    return (
      <div>
        <h1>Connect Four!</h1>
        <p>{this.getMessage()}</p>
        <Board board={this.state.board}
          onColumnMouseIn={this.onColumnMouseIn}
          onColumnMouseOut={this.onColumnMouseOut}
          onSlotClick={this.onSlotClick}
          hlColIndex={this.state.hlColIndex}
        />
      </div>
    )
  }
}

export default App;