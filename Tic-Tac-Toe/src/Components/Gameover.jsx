import React from "react";
import GameState from "../Data/GameState";

function Gameover({ gameState }) {
  switch (gameState) {
    case GameState.inProgress:
      return <div className="game-over"> who win?! </div>;;
    case GameState.playerXWins:
      return <div className="game-over"> X Wins </div>;
    case GameState.playerOWins:
      return <div className="game-over"> O Wins </div>;
    case GameState.draw:
      return <div className="game-over"> Draw </div>;
    default:
      return <div className="game-over"> Who win?! </div>;;
  }
}

export default Gameover;
