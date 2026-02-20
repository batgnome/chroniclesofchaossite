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

  // Refs to avoid re-creating interval + event listeners every tick
  const snakeRef = useRef(snake);
  const directionRef = useRef(direction);
  const foodRef = useRef(food);

  // Keep refs in sync with state
  useEffect(() => {
    snakeRef.current = snake;
  }, [snake]);

  useEffect(() => {
    directionRef.current = direction;
  }, [direction]);

  useEffect(() => {
    foodRef.current = food;
  }, [food]);

  // Set up the game loop + key listener once
  useEffect(() => {
    function handleKeyPress(e) {
      const dir = directionRef.current;

      switch (e.key) {
        case "ArrowUp":
          if (dir.y !== 1) setDirection({ x: 0, y: -1 });
          break;
        case "ArrowDown":
          if (dir.y !== -1) setDirection({ x: 0, y: 1 });
          break;
        case "ArrowLeft":
          if (dir.x !== 1) setDirection({ x: -1, y: 0 });
          break;
        case "ArrowRight":
          if (dir.x !== -1) setDirection({ x: 1, y: 0 });
          break;
        default:
          break;
      }
    }

    function move() {
      const snakeNow = snakeRef.current;
      const dirNow = directionRef.current;
      const foodNow = foodRef.current;

      const newHead = {
        x: snakeNow[0].x + dirNow.x,
        y: snakeNow[0].y + dirNow.y,
      };

      // Wall collision or self collision
      if (
        newHead.x < 0 ||
        newHead.y < 0 ||
        newHead.x >= boardSize ||
        newHead.y >= boardSize ||
        snakeNow.some(
          (segment) => segment.x === newHead.x && segment.y === newHead.y
        )
      ) {
        setGameOver(true);
        clearInterval(gameLoop.current);
        return;
      }

      const newSnake = [newHead, ...snakeNow];

      // Food collision
      if (newHead.x === foodNow.x && newHead.y === foodNow.y) {
        setFood(randomFood());
      } else {
        newSnake.pop();
      }

      setSnake(newSnake);
    }

    document.addEventListener("keydown", handleKeyPress);
    gameLoop.current = setInterval(move, 150);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
      clearInterval(gameLoop.current);
    };
  }, []);

  function randomFood() {
    return {
      x: Math.floor(Math.random() * boardSize),
      y: Math.floor(Math.random() * boardSize),
    };
  }

  function resetGame() {
    const freshSnake = initialSnake;
    const freshDir = initialDirection;
    const freshFood = randomFood();

    setSnake(freshSnake);
    setDirection(freshDir);
    setFood(freshFood);
    setGameOver(false);

    // Keep refs in sync immediately so the interval doesn't use stale values
    snakeRef.current = freshSnake;
    directionRef.current = freshDir;
    foodRef.current = freshFood;

    clearInterval(gameLoop.current);
    gameLoop.current = setInterval(() => {
      const snakeNow = snakeRef.current;
      const dirNow = directionRef.current;
      const foodNow = foodRef.current;

      const newHead = {
        x: snakeNow[0].x + dirNow.x,
        y: snakeNow[0].y + dirNow.y,
      };

      if (
        newHead.x < 0 ||
        newHead.y < 0 ||
        newHead.x >= boardSize ||
        newHead.y >= boardSize ||
        snakeNow.some(
          (segment) => segment.x === newHead.x && segment.y === newHead.y
        )
      ) {
        setGameOver(true);
        clearInterval(gameLoop.current);
        return;
      }

      const newSnake = [newHead, ...snakeNow];

      if (newHead.x === foodNow.x && newHead.y === foodNow.y) {
        setFood(randomFood());
      } else {
        newSnake.pop();
      }

      setSnake(newSnake);
    }, 150);
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
            const isSnake = snake.some((seg) => seg.x === x && seg.y === y);
            const isFood = food.x === x && food.y === y;

            return (
              <div
                key={`${x}-${y}`}
                className={`cell ${isSnake ? "snake" : ""} ${
                  isFood ? "food" : ""
                }`}
              />
            );
          })
        )}
      </div>
    </div>
  );
}

export default SnakeGame;