import React from "react";
import Tile from "./Tile";
import Strike from "./Strike";

function Board(props) {
  const handleClick = (e) => {
    props.onTileClick(e);
  };
  return (
    <div className="board">
      {[...Array(9)].map((tile, index) => (
        <Tile
          bottomBorder={
            index === 6 || index === 7 || index === 8 ? null : "bottom-border"
          }
          rightBorder={
            index === 2 || index === 5 || index === 8 ? null : "right-border"
          }
          value={props.tiles[index]}
          onClick={() => handleClick(index)}
          playerTurn={props.playerTurn}
        />
      ))}

      <Strike />
    </div>
  );
}

export default Board;
