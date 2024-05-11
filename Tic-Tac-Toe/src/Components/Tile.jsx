import React from "react";

function Tile(props) {
  return (
    <div className={`tile ${props.rightBorder} ${props.bottomBorder}`}>X</div>
  );
}

export default Tile;
