import styles from './Modal.module.css';

export const CustomModal = ({ onClose, children }) => {
  return (
    <div className={styles.modal} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
      <div className={ styles.header }>
          <img src={ '/images/icon/background.svg' } />
        </div>
        {children}
      </div>
    </div>
  );
};
