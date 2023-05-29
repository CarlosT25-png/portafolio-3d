import { useDispatch } from 'react-redux';
import { foldersActions } from '../../store/index';

import startLogo from '../../assets/winxpstart.webp';

import classes from './StartBtn.module.css';


const StartBtn = () => {
  const dispatch = useDispatch();
  const clickHandler = () => {
    dispatch(foldersActions.toggleStartMenu());
  }
  return (
    <div className={classes.start} onClick={clickHandler}>
      <img src={startLogo} alt="Windows XP Start Menu - Web" />
      <h2>Start</h2>
    </div>
  );
};

export default StartBtn;
