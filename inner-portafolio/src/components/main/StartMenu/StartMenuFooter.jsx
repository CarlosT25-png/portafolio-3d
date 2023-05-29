import powerLogo from '../../../assets/power.webp';
import logoutLogo from '../../../assets/logout.webp';

import classes from './StartMenuFooter.module.css';

const StartMenuFooter = () => {
  return <footer className={classes.footer}>
    <div>
      <img src={logoutLogo} alt='Logout Logo Windows XP Portafolio Carlos Torres'/>
      <p>Log Off</p>
    </div>
    <div>
      <img src={powerLogo} alt='Power off Logo Windows XP Portafolio Carlos Torres'/>
      <p>Turn Off Computer</p>
    </div>
  </footer>;
};

export default StartMenuFooter;
