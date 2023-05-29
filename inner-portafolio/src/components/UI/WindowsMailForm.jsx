/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
import { useState, useRef, useLayoutEffect, useEffect } from "react";
import { useDispatch } from "react-redux";
import Draggable from 'react-draggable';
import MoonLoader from 'react-spinners/MoonLoader';

import { foldersActions } from '../../store/index';

import WindowsMailInput from "./WindowsMailInputs";

//Form Submition
import { sendFormHandler } from "../../util/sendForm";

import winXpLogo from '../../assets/windowsxp.webp';
import emailSendLogo from '../../assets/email-send.webp';

import classes from './WindowsMailForm.module.css';

const WindowsMailForm = props => {
  const [formState, setFormState] = useState(0); //0: Not send, 1: Sending..., 2: Success, 3:Failure
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if(formState === 2){
      const timer = setTimeout(() => {
        setFormState(0);
      }, 3000)

      return () => {
        clearTimeout(timer);
      }
    }
  }, [formState]);

  //For form Submition
  const refName = useRef();
  const refEmail = useRef();
  const refSubject = useRef();
  const refMessage = useRef();
  const ref = {
    refName,
    refEmail,
    refSubject,
    refMessage
  }

  //For heiight and width of the window
  const dispatch = useDispatch();
  const mainFrame = useRef();

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    setWidth(x - mainFrame.current.offsetWidth / 2);
    setHeight(y - mainFrame.current.offsetHeight / 2);
  }, []);

  const closeHandler = () => {
    dispatch(foldersActions.delete(props.name));
  };

  return (
    <Draggable defaultPosition={{ x: width, y: height }} handle="#handle">
      <div ref={mainFrame} className={classes['main-frame']}>
        <div className={classes.head}>
          <div id="handle">
            <img src={props.icon} alt="Windows XP folder - Carlos Torres" />
            <h3>{props.name}</h3>
          </div>
          <div>
            <span>&minus;</span>
            <span>&#9634;</span>
            <span onClick={closeHandler}>&#9747;</span>
          </div>
        </div>
        <div className={classes['selection-bar']}>
          <h4>File</h4>
          <h4>Edit</h4>
          <h4>View</h4>
          <h4>Insert</h4>
          <h4>Format</h4>
          <h4>Tools</h4>
          <h4>Message</h4>
          <h4>Help</h4>
          <img src={winXpLogo} alt="Windows XP Logo - Carlos Torres" />
        </div>
        <div className={classes['options-tools']}>
          <div onClick={sendFormHandler.bind(null, event, ref, setFormState, setErrorMessage)}>
            <img src={emailSendLogo} alt="back windows XP - Carlos Torres" />
            <p>Send</p>
          </div>
          {formState !== 0 && 
            <div>
              {formState === 1 && <MoonLoader size={25}/>}
              {formState === 2 && <p>Email was sent succesfully, I will contact you asap.</p>}
              {formState === 3 && <p>{errorMessage}</p>}
            </div>
          }
        </div>
        <div className={classes.content}>
          <WindowsMailInput ref={ref}/>
        </div>
      </div>
    </Draggable>
  );
};

export default WindowsMailForm;
