import React from "react";
import flappybird from "../Assets/flappybird.gif";

function Bird(props) {
  return (
    <img
      src={flappybird}
      alt="flappy bird"
      className="bird"
      draggable={true}
      style={{
        left: props.positionX,
        top: props.positionY,
      }}
    />
  );
}

export default Bird;
