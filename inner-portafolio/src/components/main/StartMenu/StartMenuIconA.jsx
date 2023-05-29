import useAddWindowsFrame from '../../../util/useAddWindowsFrame';

import classes from './StartMenuIconA.module.css';

const StartMenuIconA = (props) => {
  const { backropHandler } = useAddWindowsFrame();
  let target = props.target ? props.target : '_blank';
  let subtitle = props.subtitle ? props.subtitle : '';

  const onClickHandler = (ev) => {
    ev.preventDefault();
    if(props.content){
      props.onClick({
        id: props.title,
        img: props.image,
      }, props.content);
    }else{
      props.onClick({
        id: props.title,
        img: props.image,
      });
    }
    backropHandler();
  };

  let params = {};

  if (props.onClick) {
    params['onClick'] = onClickHandler;
  }

  return (
    <a {...params} href={props.link} target={target} className={classes.link}>
      <img src={props.image} alt={props.title} />
      <div>
        <h3 className={subtitle !== '' ? classes.bold : ''}>{props.title}</h3>
        {subtitle && subtitle !== '' && <h4>{subtitle}</h4>}
      </div>
    </a>
  );
};

export default StartMenuIconA;
