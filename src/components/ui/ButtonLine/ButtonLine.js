import { useState } from 'react';
import { Button } from '../Button/Button';
import styles from './ButtonLine.module.css';
import { ModalCalc } from '@@/components/layout/Modal/ModalCalculator';

export const ButtonLine = ({ className }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <div className={ `${styles.container} ${className}` }>
      <div className={ styles.shortLine }></div>
      <div className={ styles.air }></div>
      <div className={ styles.longLine }></div>
      <Button onClick={ openModal } className={ styles.button }>узнать свой аватар</Button>
      <div className={ styles.longLine }></div>
      <div className={ styles.air }></div>
      <div className={ styles.shortLine }></div>
      { isModalOpen && <ModalCalc onClose={ closeModal } /> }
    </div>
  );
};
