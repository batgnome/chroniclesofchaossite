import { useState } from "react";
import SnakeGame from "../Games/SnakeGame";
import TicTacToe from "../Games/TicTacToe/TicTacToe";
import "./games.css"
function Games() {
  const [activeGame, setActiveGame] = useState(null);
  return (
    <div>
      <h1>Games</h1>
      <p>Follow my game development projects and devlogs.</p>
    <div className="game-header">
      <div className="game-card">
        <h2>Snake</h2>
        <button onClick={() => setActiveGame("SnakeGame")}>Play Snake</button>
      </div>
      <div className="game-card">
          <h2>TicTacToe</h2>
          <button onClick={() => setActiveGame("TicTacToe")}>Play TicTacToe</button>
      </div>
    </div>

      

      <div className="back">
        {activeGame && (<button onClick={() => setActiveGame(null)}>Back</button> )}
      </div>
      {activeGame ==="SnakeGame" && <SnakeGame />}
      {activeGame ==="TicTacToe" && <TicTacToe />}
      <div className="back">
        {activeGame && (<button onClick={() => setActiveGame(null)}>Back</button> )}
      </div>
    </div>
  );
}

export default Games;
