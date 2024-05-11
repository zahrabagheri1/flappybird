import React, { useEffect, useState } from "react";
import "./App.css";
import Board from "./Components/Board";
import Gameover from "./Components/Gameover";
import GameState from "./Data/GameState";
import Reset from "./Components/Reset";
import gameoversoundAsset from "./Assets/sounds/game-over.wav";
import clicksoundAsset from "./Assets/sounds/click.wav";

const gameOverSound = new Audio(gameoversoundAsset);
gameOverSound.volume = 0.2;
const clickSound = new Audio(clicksoundAsset);
clickSound.volume = 0.5;

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

function checkWinner(tiles, setStrikeLine, setGameState) {
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

      if (tileValue1 === playerX) {
        setGameState(GameState.playerXWins);
      } else if (tileValue1 === playerO) {
        setGameState(GameState.playerOWins);
      } else {
        setGameState(GameState.draw);
      }

      return;
    }
  }

  const areAllTilesFilledIn = tiles.every((tile) => tile !== null);
  if (areAllTilesFilledIn) {
    setGameState(GameState.draw);
  }
}

function App() {
  const [tiles, setTiles] = useState(Array(9).fill(null));
  const [playerTurn, setPlayerTurn] = useState(playerX);
  const [strikeLine, setStrikeLine] = useState();
  const [gameState, setGameState] = useState(GameState.inProgress);

  const handleTileClick = (index) => {
    if (gameState !== GameState.inProgress) {
      return;
    }

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

  const handleReset = () => {
    setGameState(GameState.inProgress);
    setTiles(Array(9).fill(null));
    setPlayerTurn(playerX);
    setStrikeLine(null);
  };

  useEffect(() => {
    checkWinner(tiles, setStrikeLine, setGameState);
  }, [tiles]);

  useEffect(() => {
    if (tiles.some((tile) => tile !== null)) {
      clickSound.play();
    }
  }, [tiles]);

  useEffect(() => {
    if (gameState !== GameState.inProgress) {
      gameOverSound.play();
    }
  }, [gameState]);

  return (
    <div className="tictactoe">
      <h1>~ Tic Tac Toe ~</h1>
      
      <Gameover gameState={gameState} />

      <Board
        tiles={tiles}
        playerTurn={playerTurn}
        onTileClick={handleTileClick}
        strikeLine={strikeLine}
      />

      <Reset gameState={gameState} onReset={handleReset} />
    </div>
  );
}

export default App;
