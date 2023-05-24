import dogIlustration from '/images/dog.png'
import styles from './Dog.module.css';
import { useRef } from 'react';
import { gsap } from 'gsap';

const Dog = ({ showAnimation }: { showAnimation: boolean}  ) => {
  const imgRef = useRef<HTMLImageElement>(null!)
  
  if(showAnimation) {
    gsap.to(imgRef.current, {
      opacity: 1,
      duration: .8,
    })
    gsap.set(imgRef.current, { y: '2rem'})
    gsap.to(imgRef.current, {
      y: '-2rem',
      yoyo: true,
      repeat: 2,
      duration: 1
    })
  }

  return (
    <>
      <img ref={imgRef} src={dogIlustration} className={styles.img} style={{ opacity: showAnimation ? 0 : 1 }} />
    </>
  );
}

export default Dog;