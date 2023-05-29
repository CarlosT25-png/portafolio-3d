import { React, useEffect, useState } from 'react';
import classes from './FooterClock.module.css';

const FooterClock = () => {
  const options = {
    hour12: true,
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h12',
  };

  const [clock, setClock] = useState(
    new Date().toLocaleTimeString('en-US', options)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setClock(new Date().toLocaleTimeString('en-US', options));
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [clock]);

  return (
    <div className={classes['clock-container']}>
      <div className={classes.divider}></div>
      <div className={classes['time-container']}>
        <time className={classes.time}>{clock}</time>
      </div>
    </div>
  );
};

export default FooterClock;
