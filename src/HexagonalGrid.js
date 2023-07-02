import React from 'react';
import Hexagon from './Hexagon';

const HexagonalGrid = ({ grid }) => {
  const size = 8; // Size of each hexagon
  const hexWidth = size * Math.sqrt(3);
  const hexHeight = size * 1.5;

  return (
    <svg width={hexWidth * grid[0].length} height={hexHeight * grid.length}>
      {grid.map((row, rowIndex) =>
        row.map((cell, columnIndex) => (
          <Hexagon
            key={`${rowIndex}-${columnIndex}`}
            x={columnIndex * hexWidth + (rowIndex % 2 === 0 ? hexWidth / 2 : 0)}
            y={rowIndex * hexHeight}
            size={size}
            isAlive={cell.isAlive}
          />
        ))
      )}
    </svg>
  );
};

export default HexagonalGrid;