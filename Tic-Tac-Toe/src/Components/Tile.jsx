import React from "react";

function Tile(props) {
  let hoverClass = null;
  if (props.value === null && props.playerTurn !== null) {
    hoverClass = `${props.playerTurn.toLowerCase()}-hover`;
  }
  return (
    <div
      onClick={props.onClick}
      className={`tile ${props.rightBorder} ${props.bottomBorder} ${hoverClass}`}
    >
      {props.value}
    </div>
  );
}

export default Tile;
