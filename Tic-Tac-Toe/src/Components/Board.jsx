import React from "react";
import Tile from "./Tile";
import Strike from "./Strike";

function Board({tiles, playerTurn, strikeLine ,onTileClick}) {
  const handleClick = (e) => {
    onTileClick(e);
  };
  return (
    <div className="board">
      {[...Array(9)].map((tile, index) => (
        <Tile
          topBorder={
            index === 0 || index === 1 || index === 2 ? "top-border" : null
          }
          leftBorder={
            index === 0 || index === 3 || index === 6 ? "left-border" : null
          }
          value={tiles[index]}
          onClick={() => handleClick(index)}
          playerTurn={playerTurn}
        />
      ))}

      <Strike strikeClass={strikeLine}/>
    </div>
  );
}

export default Board;
