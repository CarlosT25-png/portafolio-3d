import useAddWindowsFrame from '../../util/useAddWindowsFrame';
import classes from './IconInsideFolder.module.css';

const IconInsideFolder = (props) => {
  const { addBasicWindowsFrame } = useAddWindowsFrame();
  const image = require('../../assets/' + props.image + '.webp');

  const onButtonClick = () => {
    if (props.content) {
      addBasicWindowsFrame({
        id: props.title,
        img: image
      }, props.content);
      return;
    }
    if (props.url) {
      let alink = document.createElement('a');
      alink.href = props.url;
      alink.target = '_blank';
      alink.click();
      return;
    }
    let alink = document.createElement('a');
    alink.href = `files/${props.file}`;
    alink.download = `files/${props.file}`;
    alink.click();
  };

  return (
    <div onClick={onButtonClick} className={classes['main-frame']}>
      <img src={image} alt="Windows XP Icon - Carlos Torres" />
      <div className={classes.info}>
        <h4>{props.title}</h4>
        <h6>{props.filetype}</h6>
        <p>{props.size}</p>
      </div>
    </div>
  );
};

export default IconInsideFolder;
