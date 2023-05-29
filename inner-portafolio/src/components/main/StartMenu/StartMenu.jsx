import StartMenuHeader from './StartMenuHeader';
import StartMenuNetworks from './StartMenuNetworks';
import StartMenuShortcuts from './StartMenuShortcuts';
import StartMenuFooter from './StartMenuFooter';

import classes from './StartMenu.module.css';

const StartMenu = props => {
  return (
    <div className={props.className + ' ' + classes.frame}>
      <StartMenuHeader />
      <StartMenuNetworks />
      <StartMenuShortcuts />
      <StartMenuFooter />
    </div>
  )
}

export default StartMenu;