import { useState } from "react";
import MessageDialog from "./MessageDialog";
import { useDispatch } from "react-redux";
import { globalConfigActions } from "../../../store";

const TimeMachineDialogs = () => {
  const dispatch = useDispatch();
  const [ showSecondDialog, setShowSecondDialog ] = useState(false)

  return (
    <>
      {!showSecondDialog && (
        <MessageDialog title="Hey there, My name is Soli, I'm Carlos's dog, I'm here to help you" message="Example of text" onClick={() => setShowSecondDialog(true)} />
      )}
      {showSecondDialog && (
        <MessageDialog title="This is the second dialog" message="Example of text" onClick={() => {
          dispatch(globalConfigActions.setDialogIsCompleteTimeMachine(true))
        }} />
      )}
    </>
  );
}

export default TimeMachineDialogs;