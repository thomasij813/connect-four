import React from 'react';
import Circle from './circle.jsx';

const Row = ({row, rowIndex, onColumnMouseIn, onColumnMouseOut, hlColIndex, onSlotClick}) => {
  const rowStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
  }

  return (
    <div style={rowStyle}>
      {row.map((cell, i) =>
        <Circle cell={cell} key={i}
          rowIndex={rowIndex} columnIndex={i} hlColIndex={hlColIndex}
          onColumnMouseIn={onColumnMouseIn}
          onColumnMouseOut={onColumnMouseOut}
          onSlotClick={onSlotClick}
        />
      )}
    </div>
  )
}

export default Row