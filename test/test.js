const gameUtils = require('../client/utils/game.js');
const expect = require('chai').expect;

describe('Game Utils', function() {
  describe('addPiece', function() {
    it('Should add a piece to a board', function() {
      let board = [
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
      ];

      let expectedAfter = [
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,1],
      ];

      expect(gameUtils.addPiece(board, 6, 1)).to.deep.equal(expectedAfter);
    });

    it('Should add to the right column index when placing a new piece', function() {
      let board = [
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,1],
      ];

      let expectedAfter = [
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,1],
        [0,0,0,0,0,0,1],
      ];

      expect(gameUtils.addPiece(board, 6, 1)).to.deep.equal(expectedAfter);
    });

    it('Should return the board when trying to place a piece on a full column', function() {
      let board = [
        [1,2,1,2,2,1,2],
        [1,2,1,2,2,1,2],
        [1,2,1,2,2,1,2],
        [1,2,1,2,2,1,2],
        [1,2,1,2,2,1,2],
        [1,2,1,2,2,1,2],
      ];

      expect(gameUtils.addPiece(board, 6, 1)).to.deep.equal(board);
    })
  });

  describe('determineBoardFull', function() {
    it('Should accurately detect when a board is full', function() {
      let notFullBoard = [
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,1,0,0,0],
        [1,0,0,2,0,0,1],
      ];

      let fullBoard = [
        [1,2,1,2,2,1,2],
        [1,2,1,2,2,1,2],
        [1,2,1,2,2,1,2],
        [1,2,1,2,2,1,2],
        [1,2,1,2,2,1,2],
        [1,2,1,2,2,1,2],
      ];

      expect(gameUtils.determineBoardFull(notFullBoard)).to.be.false;
      expect(gameUtils.determineBoardFull(fullBoard)).to.be.true;
    });
  });

  describe('determineWin', function() {
    it('Should return null for a board that does not have a winner', function() {
      let noWinnerBoard = [
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,1,0,0,0],
        [1,0,0,2,0,0,1],
      ];

      expect(gameUtils.determineWin(noWinnerBoard)).to.be.null;
    });

    it('Should declare the winner for a board that has a row win', function() {
      let rowWinnerBoard = [
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,2,0,0,0],
        [1,1,1,1,2,2,2],
      ];

      expect(gameUtils.determineWin(rowWinnerBoard)).to.equal(1);
    });

    it('Should declare the winner for a board that has a column win', function() {
      let columnWinnerBoard = [
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,2,0,0,0],
        [0,0,1,2,0,0,0],
        [0,1,1,2,0,0,0],
        [1,1,1,2,0,2,2],
      ];

      expect(gameUtils.determineWin(columnWinnerBoard)).to.equal(2);
    });

    it('Should declare the winner for a board that has a main diagonal win', function() {
      let mainDiagonalWinnerBoard = [
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,2,0,0,0],
        [0,0,1,1,2,0,0],
        [0,1,1,2,2,2,0],
        [1,1,1,2,1,2,2],
      ];

      expect(gameUtils.determineWin(mainDiagonalWinnerBoard)).to.equal(2);
    });

    it('Should declare the winner for a board that has an antidiagonal win', function() {
      let antiDiagonalWinnerBoard = [
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,1,0,0,0],
        [0,0,1,2,2,0,0],
        [0,1,1,2,2,2,0],
        [1,1,1,2,1,2,2],
      ];

      expect(gameUtils.determineWin(antiDiagonalWinnerBoard)).to.equal(1);
    });
  });
});

