import React from 'react';
import Row from './row.jsx';

const Board = ({board, onColumnMouseIn, onColumnMouseOut, hlColIndex, onSlotClick}) => {
  return (
    <div>
      {board.map((row, i) =>
        <Row key={i} row={row} rowIndex={i}
          onColumnMouseIn={onColumnMouseIn}
          onColumnMouseOut={onColumnMouseOut}
          hlColIndex={hlColIndex}
          onSlotClick={onSlotClick}
        />
      )}
    </div>
  );
}

export default Board;