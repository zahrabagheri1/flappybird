import React from "react";
import pipe from "../Assets/pipes.png";

function Pipes(props) {
  return (
    <img
      src={pipe}
      alt="top bottom pipe"
      className="pipe"
      draggable={true}
      style={{
        left: props.positionX,
        top: props.positionY,
      }}
    />
  );
}

export default Pipes;
