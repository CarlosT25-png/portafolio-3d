import React from 'react';

import classes from './WindowsMailInputs.module.css';

const WindowsMailInput = React.forwardRef((props, ref) => {

  const { refName, refEmail, refSubject, refMessage } = ref;

  return <div className={classes.container}>
    <div className={classes.input}>
      <label htmlFor="name">Your Name: </label>
      <input ref={refName} id='name' type='text' />
    </div>
    <div className={classes.input}>
      <label htmlFor="email">Your E-Mail: </label>
      <input ref={refEmail} id='email' type='email' />
    </div>
    <div className={classes.input}>
      <label htmlFor="subject">Subject: </label>
      <input ref={refSubject} id='subject' type='text' />
    </div>
    <textarea ref={refMessage} placeholder='Your Message'></textarea>
  </div>
});

export default WindowsMailInput;