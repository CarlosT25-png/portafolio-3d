import folderIcon from '../../assets/folder.webp';
import emailIcon from '../../assets/email.webp';

import classes from './IconDesktop.module.css';


const IconDesktop = props => {
  let name;
  let icon;

  if(props.foldersName){
    name = props.foldersName;
    icon = folderIcon
  } else if(!props.foldersName && props.type === 'email'){
    name = props.name;
    icon = emailIcon;
  }

  const clickHandler = event => {
    props.onClick({id: name, img:icon});
  }


  return (
    <div className={classes.icon} onClick={clickHandler}>
      <img src={icon} alt={name}/>
      <h4>{name}</h4>
    </div>
  )
}

export default IconDesktop;