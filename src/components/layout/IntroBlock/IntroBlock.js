import { useState } from 'react';
import { Button } from '@@/components/ui';
import styles from './IntroBlock.module.css';
import { ModalCalc } from '../Modal/ModalCalculator';

export const IntroBlock = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);


  return (
    <section className={ styles.IntroBlock }>
      <div className={ styles.circle }>
        <div className={ styles.center }>
          <h1 className={ styles.title }>Аватары</h1>
          <div className={ styles.text }>
            <span className={ styles.action }>
              Узнай свой психологический аватар по дате рождения</span><br />
            Это ключ к твоим талантам, денежному потенциалу и отношениям.
          </div>
          <Button className={ styles.btn } onClick={ openModal }>Получить бесплатно </Button>
        </div>
      </div>
      <div className={ styles.char1 }></div>
      <div className={ styles.char2 }></div>
      <div className={ styles.voln }></div>
      { isModalOpen && <ModalCalc onClose={ closeModal } /> }
    </section>
  );
};
