import dogIlustration from '/images/dog.png'
import styles from './Dog.module.css';

const Dog = () => {
  return (
    <>
      <img src={dogIlustration} className={styles.img} />
    </>
  );
}

export default Dog;