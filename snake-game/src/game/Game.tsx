import styles from './Game.module.css'
import GameBoard from './GameBoard';

const Game = () => {
  return (
    <div style={{ width: `${window.innerWidth}px`, height: `${window.innerHeight}px`}} className={styles['main-container']}>
      <GameBoard width={800} height={700} />
    </div>
  );
}

export default Game;