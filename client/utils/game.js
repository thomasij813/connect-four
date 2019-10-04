const addPiece = (board, columnIndex, player) => {
  let newBoard = board.map(row => [...row]);

  for (var i = newBoard.length - 1; i >= 0; i--) {
    let row = newBoard[i];
    if (row[columnIndex] === 0) {
      row[columnIndex] = player;
      break;
    }
  }

  return newBoard;
}

const determineBoardFull = (board) => {
  for (var i = 0; i < board.length; i++) {
    let row = board[i];
    for (var j = 0; j < row.length; j++) {
      let cell = row[j];
      if (cell === 0) {return false; }
    }
  }
  return true;
}

const determineRowWin = (board) => {
  for (let i = 0; i < board.length; i++) {
    let row = board[i];
    let rowString = row.map(player => player.toString()).join('');

    if (rowString.indexOf('1111') >= 0) {
      return 1;
    }

    if (rowString.indexOf('2222') >= 0) {
      return 2;
    }
  }

  return null;
}

const determineColumnWin = (board) => {
  let numColumns = board[0].length
  let columns = [];

  for (let colIndex = 0; colIndex < numColumns; colIndex++) {
    let column = [];
    for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
      let row = board[rowIndex];
      let val = row[colIndex];
      column.push(val);
    }
    columns.push(column);
  }

  return determineRowWin(columns);
}

const determineDiagonalWin = (board) => {
  let totalRows = board.length;
  let totalColumns = board[0].length;

  const startingMajorDiagonals = [
    [0,0],
    [1,0],
    [2,0],
    [0,1],
    [0,2],
    [0,3],
  ]

  const majorDiagonals = startingMajorDiagonals.map(startingDiagonal => {
    let ri = startingDiagonal[0];
    let ci = startingDiagonal[1];

    let diagonal = [];
    while (ri < totalRows && ci < totalColumns) {
      diagonal.push(board[ri][ci])

      ri++;
      ci++
    }
     return diagonal;
  });

  const startingMinorDiagonals = [
    [5,0],
    [4,0],
    [3,0],
    [5,1],
    [5,2],
    [5,3],
  ]

  const minorDiagonals = startingMinorDiagonals.map(startingDiagonal => {
    let ri = startingDiagonal[0];
    let ci = startingDiagonal[1];

    let diagonal = [];
    while (ri >= 0 && ci < totalColumns) {
      diagonal.push(board[ri][ci])

      ri--;
      ci++
    }
     return diagonal;
  })

  let potentialMajorDiagonalWin = determineRowWin(majorDiagonals);

  if (potentialMajorDiagonalWin) {
    return potentialMajorDiagonalWin;
  } else {
    return determineRowWin(minorDiagonals);
  }
}

const determineWin = (board) => {
  let potentialRowWin = determineRowWin(board);
  if (potentialRowWin) {
    return potentialRowWin;
  }

  let potentialColumnWin = determineColumnWin(board);
  if (potentialColumnWin) {
    return potentialColumnWin;
  }

  let potentialDiagonalWin = determineDiagonalWin(board)
  if (potentialDiagonalWin) {
    return potentialDiagonalWin
  }

  return null;
}

module.exports = {
  addPiece: addPiece,
  determineBoardFull: determineBoardFull,
  determineRowWin: determineRowWin,
  determineColumnWin: determineColumnWin,
  determineDiagonalWin: determineDiagonalWin,
  determineWin: determineWin
}