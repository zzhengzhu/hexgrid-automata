import React from 'react';

const Hexagon = ({ x, y, size, isAlive }) => {
  const points = [
    [0, size],
    [size * Math.sqrt(3) / 2, size / 2],
    [size * Math.sqrt(3) / 2, -size / 2],
    [0, -size],
    [-size * Math.sqrt(3) / 2, -size / 2],
    [-size * Math.sqrt(3) / 2, size / 2],
  ];

  const hexagonStyle = {
    fill: isAlive ? 'DeepSkyBlue' : 'white',
    stroke: 'grey',
    strokeWidth: 1,
  };

  const transform = `translate(${x}, ${y})`;

  return (
    <polygon points={points.map(p => p.join(',')).join(' ')} style={hexagonStyle} transform={transform} />
  );
};

export default Hexagon;