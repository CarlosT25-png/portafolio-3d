import { useRef, useState, useLayoutEffect } from 'react';
import Draggable from 'react-draggable';
import { useDispatch } from 'react-redux';

import { foldersActions } from '../../store/index';

import classes from './WindowsFolderFrame.module.css';

const WindowsFolderFrame = (props) => {
  const dispatch = useDispatch();
  const mainFrame = useRef();

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    let x = window.innerWidth/2;
    let y = window.innerHeight/2;
    setWidth(x - mainFrame.current.offsetWidth/2);
    setHeight(y -mainFrame.current.offsetHeight/2);
  }, []);

  const closeHandler = () => {
    dispatch(foldersActions.delete(props.name));
  }

  return (
    <Draggable defaultPosition={{x: width, y: height}} handle='#handle'>
      <div ref={mainFrame} className={classes['main-frame']}>
        <div className={classes.head}>
          <div id='handle'>
            <img src={props.icon} alt="Windows XP folder - Carlos Torres" />
            <h3>{props.name}</h3>
          </div>
          <div>
            <span>&minus;</span>
            <span>&#9634;</span>
            <span onClick={closeHandler}>&#9747;</span>
          </div>
        </div>
        <div className={classes.content}>{props.children}</div>
      </div>
    </Draggable>
  );
};

export default WindowsFolderFrame;
