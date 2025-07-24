import { useEffect, useState, useRef } from "react";
import "./SnakeGame.css";

const boardSize = 20;
const initialSnake = [{ x: 8, y: 8 }];
const initialDirection = { x: 1, y: 0 };

function SnakeGame() {
  const [snake, setSnake] = useState(initialSnake);
  const [food, setFood] = useState(randomFood());
  const [direction, setDirection] = useState(initialDirection);
  const [gameOver, setGameOver] = useState(false);
  const gameLoop = useRef(null);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    gameLoop.current = setInterval(move, 150);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
      clearInterval(gameLoop.current);
    };
  }, [snake, direction]);

  function handleKeyPress(e) {
    switch (e.key) {
      case "ArrowUp":
        if (direction.y !== 1) setDirection({ x: 0, y: -1 });
        break;
      case "ArrowDown":
        if (direction.y !== -1) setDirection({ x: 0, y: 1 });
        break;
      case "ArrowLeft":
        if (direction.x !== 1) setDirection({ x: -1, y: 0 });
        break;
      case "ArrowRight":
        if (direction.x !== -1) setDirection({ x: 1, y: 0 });
        break;
      default:
        break;
    }
  }

  function move() {
    const newHead = {
      x: snake[0].x + direction.x,
      y: snake[0].y + direction.y,
    };

    if (
      newHead.x < 0 || newHead.y < 0 ||
      newHead.x >= boardSize || newHead.y >= boardSize ||
      snake.some(segment => segment.x === newHead.x && segment.y === newHead.y)
    ) {
      setGameOver(true);
      clearInterval(gameLoop.current);
      return;
    }

    const newSnake = [newHead, ...snake];

    if (newHead.x === food.x && newHead.y === food.y) {
      setFood(randomFood());
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
  }

  function randomFood() {
    return {
      x: Math.floor(Math.random() * boardSize),
      y: Math.floor(Math.random() * boardSize),
    };
  }

  function resetGame() {
    setSnake(initialSnake);
    setDirection(initialDirection);
    setFood(randomFood());
    setGameOver(false);
    gameLoop.current = setInterval(move, 150);
  }

  return (
    <div className="snake-container">
      {gameOver && (
        <div className="game-over">
          <p>Game Over!</p>
          <button onClick={resetGame}>Restart</button>
        </div>
      )}
      <div className="board">
        {[...Array(boardSize)].map((_, y) =>
          [...Array(boardSize)].map((_, x) => {
            const isSnake = snake.some(seg => seg.x === x && seg.y === y);
            const isFood = food.x === x && food.y === y;
            return (
              <div
                key={`${x}-${y}`}
                className={`cell ${isSnake ? "snake" : ""} ${isFood ? "food" : ""}`}
              ></div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default SnakeGame;
