import { useState } from "react";
import SnakeGame from "../Games/SnakeGame";
import TicTacToe from "../Games/TicTacToe/TicTacToe";

function Games() {
  const [showSnake, setShowSnake] = useState(false);
  const [showTicTacToe, setTicTacToe] = useState(false);

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
      <h2>TicTacToe</h2>
      {!showTicTacToe ? (
        <button onClick={() => setTicTacToe(true)}>Play TicTacToe</button>
      ) : (
        <TicTacToe />
      )}
    </div>
  );
}

export default Games;
