import { ReactNode, Ref, useEffect, useRef, useState } from 'react';
import styles from './GameBoard.module.css';

interface Props {
  height: number,
  width: number
}

const GameBoard = ( { width, height }: Props ) => {
  const columns = Math.trunc(width / 20 )
  const rows = Math.trunc(height / 20)

  const [gameBoardCells, _] = useState<Array<Array<ReactNode>>>(new Array<Array<ReactNode>>(rows))
  const [gameBoardCellsRef, setGameBoardCellsRef] = useState<Array<Array<Ref<HTMLDivElement>>>>(new Array<Array<Ref<HTMLDivElement>>>(rows))
  
  for(let i = 0; i < gameBoardCells.length; i++){
    gameBoardCells[i] = new Array<ReactNode>(columns)
  }

  for (let i = 0; i < gameBoardCells.length; i++) {
    for(let j = 0; j < columns ; j++ ){
      const divRef = useRef<HTMLDivElement>(null!)
      gameBoardCells[i][j] = <div ref={divRef} key={`${i}+${j}`} className={styles['grid-item']}></div>
      gameBoardCellsRef[i][j] = divRef
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if( gameBoardCellsRef ) {

        if(gameBoardCellsRef[rows/2][columns/2] !== null ){
          gameBoardCellsRef[rows/2].find()
        }
        
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);


  return (
    <div style={{ width, height, gridTemplateColumns: `repeat(${columns}, 20px)`, gridTemplateRows: `repeat(${rows}, 20px)`}} className={styles['game-board']}>
      {gameBoardCells.map(row => {
        return row.map(column => column)
      })}
    </div>
  );
}

export default GameBoard;