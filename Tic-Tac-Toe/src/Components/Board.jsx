import React from "react";
import Tile from "./Tile";
import Strike from "./Strike";

function Board() {
  return (
    <div className="board">
      {[...Array(9)].map((tile) => (
        <Tile />
      ))}

      <Strike/>
    </div>
  );
}

export default Board;
