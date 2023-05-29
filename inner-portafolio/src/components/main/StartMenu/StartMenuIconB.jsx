import useAddWindowsFrame from '../../../util/useAddWindowsFrame';
import classes from './StartMenuIconB.module.css';

const StartMenuIconB = (props) => {
  const { backropHandler } = useAddWindowsFrame();

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
    <div {...params} className={classes.link}>
      <img src={props.image} alt={props.title} />
      <h3 className={props.bold ? classes.bold : ''}>{props.title}</h3>
    </div>
  );
};

export default StartMenuIconB;
