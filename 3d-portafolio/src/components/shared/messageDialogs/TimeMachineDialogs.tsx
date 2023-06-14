import { useState } from 'react'
import MessageDialog from './MessageDialog'
import { useDispatch } from 'react-redux'
import { globalConfigActions } from '../../../store'

const TimeMachineDialogs = () => {
  const dispatch = useDispatch()
  const [showSecondDialog, setShowSecondDialog] = useState(false)

  return (
    <>
      {!showSecondDialog && (
        <MessageDialog
          title="Hey there, My name is Soli, I'm Carlos's dog, I'm here to help you"
          showAnimation
          message='I think you are here to know a little bit more about Carlos, so let me tell you, you are in the right place.'
          onClick={() => setShowSecondDialog(true)}
        />
      )}
      {showSecondDialog && (
        <MessageDialog
          title='A wise man once said, "To know someone well, know their past."'
          showAnimation={false}
          message="Luckily, we can use Carlos's time travel machine to go to his childhood bedroom, where you'll find helpful information. So, pick a date with the 'date controls' and then use the lever"
          onClick={() => {
            dispatch(globalConfigActions.setDialogIsCompleteTimeMachine(true))
          }}
        />
      )}
    </>
  )
}

export default TimeMachineDialogs
