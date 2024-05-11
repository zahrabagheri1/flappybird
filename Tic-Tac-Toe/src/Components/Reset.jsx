import React from "react";
import GameState from "../Data/GameState";

function Reset({gamestate, onReset}) {
  if (gamestate === GameState.inProgress) {
    return;
  }
  return (
    <button type="button" className="reset-button" onClick={onReset}>
      Reset
    </button>
  );
}

export default Reset;
