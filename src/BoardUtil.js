const newBoardStatus = (radius, cellStatus = () => Math.random() < 0.3) => {
  const grid = [];

  const numRows = radius * 2 - 1; // Number of rows in the board
  const numColumns = radius * 2 - 1; // Number of columns in the board

  for (let r = 0; r < numRows; r++) {
    const row = [];

    // Offset the cells in odd rows to create a hexagonal pattern
    const offset = r % 2 === 0 ? 0 : 0.5 * Math.sqrt(3);

    for (let c = 0; c < numColumns; c++) {
      // Determine if the cell is alive or dead based on cellStatus
      const isAlive = cellStatus();

      row.push({ x: c + offset, y: r, isAlive });
    }

    grid.push(row);
  }

  return grid;
};

const iterateBoard = (grid) => {
  const numRows = grid.length;
  const numColumns = grid[0].length;

  const updatedGrid = [];

  for (let r = 0; r < numRows; r++) {
    const updatedRow = [];

    for (let c = 0; c < numColumns; c++) {
      const cell = grid[r][c];
      const { x, y, isAlive } = cell;

      const aliveNeighbors = countAliveNeighbors(grid, r, c);

      let updatedIsAlive = isAlive;

      if (aliveNeighbors < 1 || aliveNeighbors >= 5) {
        updatedIsAlive = false;
      } else if (aliveNeighbors === 3) {
        updatedIsAlive = true;
      } else if (aliveNeighbors === 4) {
        updatedIsAlive = !isAlive;
      }

      // if (r >= 10 && r <= 20 && c >= 10 && c <= 20) {
      //   updatedIsAlive = !isAlive;
      // }

      updatedRow.push({ x, y, isAlive: updatedIsAlive });
    }

    updatedGrid.push(updatedRow);
  }

  return updatedGrid;

  // Update the original grid with the updated grid
  // for (let r = 0; r < numRows; r++) {
  //   for (let c = 0; c < numColumns; c++) {
  //     grid[r][c] = updatedGrid[r][c];
  //   }
  // }
};

const countAliveNeighbors = (grid, r, c) => {
  const numRows = grid.length;
  const numColumns = grid[0].length;

  let neighborCoordinates = [];

  if (r % 2 === 0) {
    neighborCoordinates = [
      [r, c - 1],
      [r + 1, c],
      [r + 1, c + 1],
      [r, c + 1],
      [r - 1, c + 1],
      [r - 1, c],
    ];
  } else {
    neighborCoordinates = [
      [r, c - 1],
      [r + 1, c],
      [r + 1, c - 1],
      [r, c + 1],
      [r - 1, c - 1],
      [r - 1, c],
    ];
  }

  let aliveCount = 0;

  for (let i = 0; i < neighborCoordinates.length; i++) {
    const [r, c] = neighborCoordinates[i];

    if (r >= 0 && r < numColumns && c >= 0 && c < numRows) {
      const neighbor = grid[r][c];

      if (neighbor.isAlive === true) {
        aliveCount++;
      }
    }
  }

  return aliveCount;
};

export { newBoardStatus, iterateBoard };
