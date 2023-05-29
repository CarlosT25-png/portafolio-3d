import { useRef, useState, useLayoutEffect } from 'react';
import Draggable from 'react-draggable';
import { useDispatch } from 'react-redux';

import { foldersActions } from '../../store/index';
import WindowsFrameContent from './WindowsFrameContent';

import classes from './WindowsFolderFrame.module.css';

import winXpLogo from '../../assets/windowsxp.webp';
import back from '../../assets/Back.webp';
import forward from '../../assets/Forward.webp';
import folderUp from '../../assets/Up.webp';
import search from '../../assets/Search.webp';
import folderView from '../../assets/folders.webp';
import folderFrame from '../../assets/folder-view.webp';

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
        <div className={classes['selection-bar']}>
          <h4>File</h4>
          <h4>Edit</h4>
          <h4>View</h4>
          <h4>Favorites</h4>
          <h4>Tools</h4>
          <h4>Help</h4>
          <img src={winXpLogo} alt="Windows XP Logo - Carlos Torres" />
        </div>
        <div className={classes['options-tools']}>
          <div>
            <img src={back} alt="back windows XP - Carlos Torres" />
            <p>Back</p>
            <img src={forward} alt="forward windows XP - Carlos Torres" />
            <img src={folderUp} alt="folder up windows XP - Carlos Torres" />
          </div>
          <div>
            <img src={search} alt="search windows XP - Carlos Torres" />
            <p>Search</p>
            <img src={folderView} alt="folders windows XP - Carlos Torres" />
            <p>Folders</p>
          </div>
          <div>
            <img
              src={folderFrame}
              alt="folder frame windows XP - Carlos Torres"
            />
          </div>
        </div>
        <WindowsFrameContent className={classes.content} type={props.name}/>
      </div>
    </Draggable>
  );
};

export default WindowsFolderFrame;
