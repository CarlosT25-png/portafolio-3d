import FooterClock from './FooterClock';
import StartBtn from '../../UI/StartBtn';
import classes from './FooterNav.module.css'

const FooterNav = props => {

  return <div className={props.className + ' ' + classes['container']}>
    <StartBtn />
    <FooterClock />
  </div>
}

export default FooterNav;