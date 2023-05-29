import classes from './LoadingBarStart.module.css';

const LoadingBarStart = () => {
  return (
    <div className={classes['container-loading']}>
      <div className={classes['container-spinner']}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  )
}

export default LoadingBarStart;