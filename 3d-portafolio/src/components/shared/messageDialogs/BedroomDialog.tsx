import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import MessageDialog from './MessageDialog'
import { globalConfigActions } from '../../../store'
import { BedroomSounds } from '../../bedroomExperience/sounds/BedroomSounds'

const BedroomDialog = () => {
  const dispatch = useDispatch()

  const sounds = useMemo(() => {
    return BedroomSounds.getInstance()
  }, [])

  return (
    <MessageDialog
      title='This is the bedroom dialog'
      showAnimation={true}
      message='Example of text'
      onClick={() => {
        sounds.musicBg.start(0)
        dispatch(globalConfigActions.setDialogIsCompleteBedroom(true))
      }}
    />
  )
}

export default BedroomDialog
