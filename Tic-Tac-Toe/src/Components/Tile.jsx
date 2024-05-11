import React from "react";

function Tile(props) {
  return (
    <div onClick={props.onClick} className={`tile ${props.rightBorder} ${props.bottomBorder}`}>{props.value}</div>
  );
}

export default Tile;
