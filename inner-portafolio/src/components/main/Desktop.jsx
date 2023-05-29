import DesktopView from './DesktopGrid/DesktopView';
import FooterNav from './FooterNav/FooterNav';

import classes from './Desktop.module.css';

const Desktop = () => {

  return <>
    <DesktopView className={classes.main} />
    <FooterNav className={classes.footer} />
  </>
}


export default Desktop;