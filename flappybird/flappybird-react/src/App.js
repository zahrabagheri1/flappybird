import { useEffect, useState } from "react";
import "./App.css";
import Bird from "./Components/Bird";
import Pipes from "./Components/Pipes";

function App() {
  const [birdPosition, setBirdPosition] = useState({ x: 50, y: 200 });
  const [pipes, setPipes] = useState([]);

  const moveBird = () => {};

  return (
    <div className={`board`} onClick={moveBird}>
      <Bird positionX={birdPosition.x} positionY={birdPosition.y} />
      {pipes.map((pipe, index) => (
        <div key={index}>
          <Pipes positionX={pipe.x} positionY={pipe.y} />
        </div>
      ))}
    </div>
  );
}

export default App;
