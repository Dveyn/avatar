import styles from './Form.module.css';

export const Form = ({ className, children }) => {
  return (
    <div className={ `${styles.form} ${className}` }>
      <i className={ styles.star } />
      <i className={ styles.star2 } />
      <i className={ styles.star3 } />
      <i className={ styles.star4 } />
      { children }
    </div>
  );
};
