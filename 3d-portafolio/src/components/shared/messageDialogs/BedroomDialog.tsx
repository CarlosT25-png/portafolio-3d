import { useDispatch } from 'react-redux'
import MessageDialog from './MessageDialog'
import { globalConfigActions } from '../../../store'

const BedroomDialog = () => {
  const dispatch = useDispatch()

  return (
    <MessageDialog
      title='This is the bedroom dialog'
      showAnimation={true}
      message='Example of text'
      onClick={() => {
        dispatch(globalConfigActions.setDialogIsCompleteBedroom(true))
      }}
    />
  )
}

export default BedroomDialog
