import React from "react";

function Tile({value, playerTurn, onClick, leftBorder,topBorder}) {
  let hoverClass = null;
  if (value === null && playerTurn !== null) {
    hoverClass = `${playerTurn.toLowerCase()}-hover`;
  }
  return (
    <div
      onClick={onClick}
      className={`tile right-border bottom-border ${leftBorder} ${topBorder} ${hoverClass}`}
    >
      {value}
    </div>
  );
}

export default Tile;
