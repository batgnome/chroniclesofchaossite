import { useState } from "react";
import SnakeGame from "../Games/SnakeGame";

function Games() {
  const [showSnake, setShowSnake] = useState(false);

  return (
    <div>
      <h1>Games</h1>
      <p>Follow my game development projects and devlogs.</p>

      <h2>Snake</h2>
      {!showSnake ? (
        <button onClick={() => setShowSnake(true)}>Play Snake</button>
      ) : (
        <SnakeGame />
      )}
    </div>
  );
}

export default Games;
