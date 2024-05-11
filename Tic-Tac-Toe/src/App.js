import React, { useEffect, useState } from "react";
import "./App.css";
import Board from "./Components/Board";

const playerX = "X";
const playerO = "O";
const winnerCombinations = [
  // * Rows
  { combo: [0, 1, 2], strike: "strike-row-1" },
  { combo: [3, 4, 5], strike: "strike-row-2" },
  { combo: [6, 7, 8], strike: "strike-row-3" },

  // * Column
  { combo: [0, 3, 6], strike: "strike-column-1" },
  { combo: [1, 4, 7], strike: "strike-column-2" },
  { combo: [2, 5, 8], strike: "strike-column-3" },

  // * Diagonal
  { combo: [0, 4, 8], strike: "strike-diagonal-1" },
  { combo: [2, 4, 6], strike: "strike-diagonal-2" },
];

function checkWinner(tiles, setStrikeLine) {
  for (const { combo, strike } of winnerCombinations) {
    const tileValue1 = tiles[combo[0]];
    const tileValue2 = tiles[combo[1]];
    const tileValue3 = tiles[combo[2]];

    if (
      tileValue1 !== null &&
      tileValue1 === tileValue2 &&
      tileValue1 === tileValue3
    ) {
      setStrikeLine(strike);
    }
  }
}

function App() {
  const [tiles, setTiles] = useState(Array(9).fill(null));
  const [playerTurn, setPlayerTurn] = useState(playerX);
  const [strikeLine, setStrikeLine] = useState();

  const handleTileClick = (index) => {
    if (tiles[index] !== null) {
      return;
    }
    const newTile = [...tiles];
    newTile[index] = playerTurn;
    setTiles(newTile);
    if (playerTurn === playerX) {
      setPlayerTurn(playerO);
    } else {
      setPlayerTurn(playerX);
    }
  };
  useEffect(() => {
    checkWinner(tiles, setStrikeLine);
  }, [tiles]);

  return (
    <div className="tictactoe">
      <h1>~ Tic Tac Toe ~</h1>
      <Board
        tiles={tiles}
        playerTurn={playerTurn}
        onTileClick={handleTileClick}
        strikeLine={strikeLine}
      />
    </div>
  );
}

export default App;
