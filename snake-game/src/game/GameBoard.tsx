import { FormEvent, useEffect, useRef, useState } from "react";
import styles from "./GameBoard.module.css";
import AppleLogo from "/apple.png";
import useInterval from "./useInterval";
import { UserScore, addNewScore, getHighestScores } from "./Scores";

// interface Props {
//   height: number,
//   width: number
// }

const canvasX = 1000;
const canvasY = 1000;
const initialSnake = [
  [4, 10],
  [4, 10],
];
const initialApple = [14, 10];
const scale = 50;
const timeDelay = 100;

const GameBoard = () => {
  // { width, height }: Props
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [snake, setSnake] = useState(initialSnake);
  const [apple, setApple] = useState(initialApple);
  const [direction, setDirection] = useState([0, -1]);
  const [delay, setDelay] = useState<number | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [firstGame, setFirstGame] = useState(true);
  const [userName, setUserName] = useState<string>();
  const [userRanking, setUserRanking] = useState<UserScore[]>();

  useInterval(() => runGame(), delay);

  useEffect(() => {
    let fruit = document.getElementById("fruit") as HTMLCanvasElement;
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.setTransform(scale, 0, 0, scale, 0, 0);
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        ctx.fillStyle = "#820002";
        snake.forEach(([x, y]) => ctx.fillRect(x, y, 1, 1));
        ctx.drawImage(fruit, apple[0], apple[1], 1, 1);
      }
    }
  }, [snake, apple, gameOver]);

  const play = async () => {
    setSnake(initialSnake);
    setApple(initialApple);
    setDirection([1, 0]);
    setDelay(timeDelay);
    setScore(0);
    setGameOver(false);
    setFirstGame(false);

    const rank = await getHighestScores();
    rank?.reverse();
    setUserRanking(rank);
  };

  function checkCollision(head: number[]) {
    for (let i = 0; i < head.length; i++) {
      if (head[i] < 0 || head[i] * scale >= canvasX) return true;
    }
    for (const s of snake) {
      if (head[0] === s[0] && head[1] === s[1]) return true;
    }
    return false;
  }

  function appleAte(newSnake: number[][]) {
    let coord = apple.map(() => Math.floor((Math.random() * canvasX) / scale));
    if (newSnake[0][0] === apple[0] && newSnake[0][1] === apple[1]) {
      let newApple = coord;
      setScore(score + 1);
      setApple(newApple);
      return true;
    }
    return false;
  }

  function handleSetScore() {
    if (score > Number(localStorage.getItem("snakeScore")) && userName) {
      localStorage.setItem("snakeScore", JSON.stringify(score));
      const data = {
        name: userName,
        score,
      };
      addNewScore(data);
    } else if (firstGame && userName) {
      localStorage.setItem("snakeScore", JSON.stringify(score));
      const data = {
        name: userName,
        score,
      };
      addNewScore(data);
    }
  }

  // Because it execute handleSetScore before adding a name
  useEffect(() => {
    handleSetScore();
  }, [userName]);

  useEffect(() => {
    const getRank = async () => {
      const rank = await getHighestScores();
      rank?.reverse();
      setUserRanking(rank);
    };

    getRank();
  }, [gameOver]);

  function runGame() {
    const newSnake = [...snake];
    const newSnakeHead = [
      newSnake[0][0] + direction[0],
      newSnake[0][1] + direction[1],
    ];
    newSnake.unshift(newSnakeHead);
    if (checkCollision(newSnakeHead)) {
      setDelay(null);
      setGameOver(true);
      handleSetScore();
    }
    if (!appleAte(newSnake)) {
      newSnake.pop();
    }
    setSnake(newSnake);
  }

  function changeDirection(e: KeyboardEvent) {
    switch (e.key) {
      case "ArrowLeft":
        setDirection([-1, 0]);
        break;
      case "ArrowUp":
        setDirection([0, -1]);
        break;
      case "ArrowRight":
        setDirection([1, 0]);
        break;
      case "ArrowDown":
        setDirection([0, 1]);
        break;
    }
  }

  useEffect(() => {
    const handleKeyDown = (ev: KeyboardEvent) => {
      if (ev.code === "Space" && (ev.target as Element).nodeName !== "INPUT") {
        play();
      } else {
        changeDirection(ev);
      }
    };

    document.body.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const submitNameHandler = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const formData = new FormData(ev.currentTarget);
    const name = formData.get("name") as string;
    setUserName(name);
  };

  // This is a fix for the focus while render in an ifram
  const firstClickHandler = () => {
    if (firstGame) {
      play();
    } 
  };

  return (
    <div
      onKeyDown={(ev) => changeDirection(ev as unknown as KeyboardEvent)}
      className={styles["game-board"]}
    >
      <img
        id="fruit"
        className={styles["fruit"]}
        src={AppleLogo}
        alt="fruit"
        width="30"
      />
      <div className={styles["playArea-Container"]} onClick={firstClickHandler}>
        <canvas
          className={styles["playArea"]}
          ref={canvasRef}
          width={`${canvasX}px`}
          height={`${canvasY}px`}
        />
        <div className={styles["scoreBox"]}>
          <h2>Score: {score}</h2>
          <h2>High Score: {localStorage.getItem("snakeScore")}</h2>
        </div>
      </div>
      {/* When the user lose the game */}
      {!firstGame && gameOver && userName && (
        <div className={`${styles["gameOver"]} ${styles["gameOver-dual"]}`}>
          <div>
            <h2>The Snake Game</h2>
            <h4 className={styles["subtitle"]}>Press 'Space' to restart the game</h4>
          </div>
          <div className={styles["gameOver-dual--right"]}>
            <h4>Ranking</h4>
            {userRanking && (
              <ul>
                {userRanking.map((userScore, idx) => {
                  return (
                    <li key={idx}>
                      {idx + 1} - {userScore.name} {userScore.score} points
                    </li>
                  );
                })}
              </ul>
            )}
            {!userRanking && <p>Not set.</p>}
          </div>
        </div>
      )}
      {/* Show a dialog score after the first lose */}
      {!userName && gameOver && (
        <div className={`${styles["gameOver"]} ${styles["gameOver-dual"]}`}>
          <div>
            <h2>The Snake Game</h2>
            <h4 className={styles["subtitle"]}>Press 'Space' to restart the game</h4>
          </div>
          <div className={styles["gameOver-dual--right"]}>
            <h4 className={styles["subtitle"]}>Your Name</h4>
            <form onSubmit={submitNameHandler}>
              <input name="name" placeholder="Name" required max={15} min={3} />
              <button>Save</button>
            </form>
          </div>
        </div>
      )}
      {/* Show a Intro screen in the first game */}
      {firstGame && (
        <div className={styles["gameOver"]}>
          <h2>The Snake Game</h2>
          <h4 className={styles["subtitle"]}>Click to start the game</h4>
        </div>
      )}
    </div>
  );
};

export default GameBoard;
