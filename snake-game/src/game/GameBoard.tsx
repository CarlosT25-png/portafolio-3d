interface Props {
  height: number,
  width: number
}

const GameBoard = ( { width, height }: Props ) => {
  return (
    <div style={{ width, height}} className="">

    </div>
  );
}

export default GameBoard;