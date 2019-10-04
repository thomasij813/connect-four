import React from 'react';

const Circle = ({cell, rowIndex, hlColIndex, columnIndex, onColumnMouseIn, onColumnMouseOut, onSlotClick}) => {
  const fillColor = getFillColor(cell);
  const strokeColor = getStrokeColor(cell);

  const handleMouseIn = () => {
    onColumnMouseIn(columnIndex);
  }

  const handleMouseOut = () => {
    onColumnMouseOut();
  }

  const handleClick = () => {
    onSlotClick(columnIndex);
  }

  const style = {justifySelf: 'center', padding: '10px 10px'};

  if (hlColIndex === columnIndex) {
    style.backgroundColor = 'yellow';
  }

  return (
    <svg width="30" height="30" style={style}
      onMouseEnter={handleMouseIn} onMouseLeave={handleMouseOut}>
      <circle cx="15" cy="15" r="14"
        stroke={strokeColor} fill={fillColor} onClick={handleClick}/>
    </svg>
  );
}

const getFillColor = (cell) => {
  switch(parseInt(cell)) {
    case 0:
      return 'white';
    case 1:
      return 'red';
    case 2:
      return 'blue';
  }
}

const getStrokeColor = (cell) => {
  switch(parseInt(cell)) {
    case 0:
      return 'black';
    case 1:
      return 'red';
    case 2:
      return 'blue';
  }
}

export default Circle;