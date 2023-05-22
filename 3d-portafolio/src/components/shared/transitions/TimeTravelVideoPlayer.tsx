import ReactPlayer from 'react-player'

const TimeTravelVideoPlayer = () => {
  return (
    <div style={{ width: '100vw', height: '100vh'}}>
      <ReactPlayer volume={1} onEnded={() => console.log('finish')} url={'./videos/time-travel.mp4'} width={'100%'} height={'100%'} config={{
        file: {
          attributes: {
            autoPlay: true
          },
        }
      }} />
    </div>
  );
}

export default TimeTravelVideoPlayer;