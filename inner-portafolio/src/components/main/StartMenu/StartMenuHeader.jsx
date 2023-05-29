import logo from '../../../assets/mylogo.webp';

import classes from './StartMenuHeader.module.css';

const StartMenuHeader = (props) => {
  return (
    <header className={props.className + ' ' + classes.header}>
      <img src={logo} alt='Carlos Torres - Web Developer' />
      <h1>Carlos Torres</h1>
    </header>
  );
};

export default StartMenuHeader;
