import { useEffect, useLayoutEffect, useMemo, useRef, forwardRef } from 'react'
import ReactPlayer from 'react-player'
import { useDispatch } from 'react-redux'
import { globalConfigActions } from '../../../store';
import { scenes } from '../../../store/global/globalConfigSlice';
import { unmountOverlay } from '../html/FadeInOverlay';
import { BedroomSounds } from '../../bedroomExperience/sounds/BedroomSounds';
import { isMobileOrTablet } from '../utils/ResponsiveCheck';

const TimeTravelVideoPlayer = forwardRef<HTMLVideoElement>((_, ref) => {
  const dispacth = useDispatch();
  const videoRef = useRef<ReactPlayer>(null!)

  useLayoutEffect(() => {
    unmountOverlay();
  }, [])

  // const snd = useMemo(() => {
  //   return BedroomSounds.getInstance();
  // }, [])

  // useEffect(() => {
  //   snd.loadTransitionAudio()
  // }, [])

  const endHandler = () => {
    setTimeout(() => {
      dispacth(globalConfigActions.setScene(scenes.BEDROOM))
    }, 800)
  }

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <video
        ref={ref}
        src='/videos/time-travel.mp4'
        width={'100%'}
        height={'100%'}
        autoPlay={!isMobileOrTablet()} // only true for pc
        // muted={isMobileOrTablet()} // only true for pc
        playsInline
        // controls={!isMobileOrTablet()}
        style={{objectFit: 'cover'}}
        onEnded={endHandler}
      />
      {/* <ReactPlayer
        ref={videoRef}
        volume={1}
        onEnded={endHandler}
        url={'./videos/time-travel.mp4'}
        width={'100%'}
        height={'100%'}
        playing
        controls={false}
        playsinline
        onStart={beginningHandler}
      /> */}
    </div>
  )
})

export default TimeTravelVideoPlayer
