import styles from './Button.module.css'

export const Button = ({ className, children, onClick }) => {
  return <button className={`${styles.btn} ${className}`} onClick={onClick}>{ children }</button>;
};
