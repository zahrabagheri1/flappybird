import React, { useState } from "react";
import "./App.css";
import Board from "./Components/Board";

const playerX = "X";
const playerO = "O";

function App() {
  const [tiles, setTiles] = useState(Array(9).fill(null));
  const [playerTurn, setPlayerTurn] = useState(playerX);

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

  return (
    <div className="tictactoe">
      <h1>Tic Tac Toe</h1>
      <Board tiles={tiles} onTileClick={handleTileClick} />
    </div>
  );
}

export default App;
