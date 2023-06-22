import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MessageDialog from './MessageDialog'
import { RootState, globalConfigActions } from '../../../store'
import { BedroomSounds } from '../../bedroomExperience/sounds/BedroomSounds'

const BedroomDialog = () => {
  const dispatch = useDispatch()
  const year = useSelector<RootState>(state => state.date.year) as number

  const sounds = useMemo(() => {
    return BedroomSounds.getInstance()
  }, [])

  return (
    <MessageDialog
      title={`Welcome to ${(+year)+2005}! I present to you Carlos's Bedroom`}
      showAnimation={true}
      message='There is a lot you can do here. However, I believe the PC could be helpful for you. Feel free to explore the bedroom.'
      onClick={() => {
        sounds.musicBg.start(0)
        dispatch(globalConfigActions.setDialogIsCompleteBedroom(true))
      }}
    />
  )
}

export default BedroomDialog
