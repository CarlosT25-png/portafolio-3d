/* eslint-disable no-useless-escape */
import { send } from 'emailjs-com';

const reEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const inputsAreValids = (data, setErrorMessage) => {
  if(data.from_name === ''){
    setErrorMessage('Please enter a valid name');
    return false;
  }

  if(data.subject === ''){
    setErrorMessage('Please enter a valid subject');
    return false;
  }

  if(data.message === ''){
    setErrorMessage('Please enter a valid message');
    return false;
  }

  if(!reEmail.test(data.reply_to)){
    setErrorMessage('Please enter a valid email');
    return false;
  }

  return true;
}

const cleanUp = ref => {
  ref.refName.current.value = '';
  ref.refSubject.current.value = '';
  ref.refMessage.current.value = '';
  ref.refEmail.current.value = '';
}

export const sendFormHandler = async (ev, ref, setFormState, setErrorMessage) => {

  const data = {
    from_name: ref.refName.current.value,
    subject: ref.refSubject.current.value,
    message: ref.refMessage.current.value,
    reply_to: ref.refEmail.current.value,
  }

  if(!inputsAreValids(data, setErrorMessage)){
    setFormState(3);
    return;
  }

  setFormState(1);
  const response= await send('service_wbisf8l', 'template_8sx2g9v', data, 'BEifDN305kpGLzGGK');
  
  if(response.text === 'OK'){
    setFormState(2);
  } else {
    setErrorMessage(response.text);
    setFormState(3);
  }

  cleanUp(ref);
};