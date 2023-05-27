import styles from './Game.module.css'
import GameBoard from './GameBoard';

const Game = () => {
  return (
    <div style={{ width: `${window.innerWidth}px`, height: `${window.innerHeight}px`}} className={styles['main-container']}>
      <GameBoard />
    </div>
  );
}

export default Game;