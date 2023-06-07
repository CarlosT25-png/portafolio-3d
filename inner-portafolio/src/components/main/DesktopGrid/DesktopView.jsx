import { useSelector } from 'react-redux';
import useAddWindowsFrame from '../../../util/useAddWindowsFrame';

import IconDesktop from '../../UI/IconDesktop';
import StartMenu from '../StartMenu/StartMenu';

import classes from './DesktopView.module.css';

const Desktop = (props) => {
  const folders = useSelector((state) => state.folders.folders);
  const showStartMenu = useSelector((state) => state.folders.showStartMenu);

  const {addFolderWindows, addEmailWindows, backropHandler} = useAddWindowsFrame();

  return (
    <>
      <div className={props.className + ' ' + classes['container-grid']}>
        {showStartMenu && (
          <>
            <div className={classes.backdrop} onClick={backropHandler}></div>
            <StartMenu className={classes.menu} />{' '}
          </>
        )}
        {folders.map((folder) => folder.item)}
        <IconDesktop foldersName="CV & Summary" onClick={addFolderWindows}/>
        <IconDesktop foldersName="Certifications" onClick={addFolderWindows} />
        <IconDesktop foldersName="Info" onClick={addFolderWindows} />
        <IconDesktop foldersName="Projects" onClick={addFolderWindows} />
        <IconDesktop type="email" name="Contact Me" onClick={addEmailWindows} />
      </div>
    </>
  );
};

export default Desktop;
