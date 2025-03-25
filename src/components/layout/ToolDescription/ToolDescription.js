import { Button, Form } from '@@/components/ui';
import styles from './ToolDescription.module.css';
import { useState } from 'react';
import { ModalCalc } from '../Modal/ModalCalculator';
import { Modal } from '../Modal/Modal';

export const ToolDescription = () => {
  const [title, setTitle] = useState('');
  const [posId, setPosId] = useState(null);
  const [price, setPrice] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalCalcOpen, setIsModalCalcOpen] = useState(false);


  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openModalCalc = () => setIsModalCalcOpen(true);
  const closeModalCalc = () => setIsModalCalcOpen(false);

  return (
    <section className={ styles.section } id='services'>
      <div className={ styles.stars_map }></div>
      <h2 className={ styles.title }>Мы предлагаем  <span style={ { color: 'rgb(255, 225, 6)' } }>новый инструмент </span><br /> для самопознания</h2>
      <p className={ styles.description }>
        Он помогает ответить на важные жизненные вопросы: "Кто я?" и "Как реализовать свой потенциал?". Используя вашу дату рождения и психологические типирования, он указывает на ваши таланты и способности, которые помогут достигать целей. Откройте гармоничную и осознанную жизнь с нашим уникальным методом!
      </p>

      <div className={ styles.form_block }>
        <Form className={ styles.form } >
          <div className={ styles.text_block }>
            <h3 className={ styles.h3 }>Узнать Аватар</h3>
            <p className={ styles.text }>
              Стоимость — 2000 руб.
            </p>
            <p className={ styles.discount_text }>
              При заказе 2 и более аватаров — скидка 50%!
            </p>
            
            <Button onClick={ openModalCalc } className={ styles.btn }>узнай свой аватар</Button>
          </div>
          <div className={ `${styles.img} ${styles.img1}` }>
            <img src={ '/images/icon/cart.png' } alt='Узнать свой аватар'/>
          </div>
        </Form>
        <Form className={ styles.form } >
          <div className={ styles.text_block }>
            <h3 className={ styles.h3 }>Личная консультация</h3>
            <p className={ styles.text }>
              Длительность - 60 мин <br />
              Стоимость - 5000 руб
            </p>
            <Button
              onClick={ () => {
                setTitle('Записаться на личную консультацию');
                setPosId(1);
                setPrice(5000)
                openModal();
              } }
              className={ styles.btn }>Записаться</Button>
          </div>
          <div className={ `${styles.img} ${styles.img2}` }>
            <img src={ '/images/icon/char6.png' } alt='Записаться на личную консультацию'/>
          </div>
        </Form>
        <Form className={ styles.form } >
          <div className={ styles.text_block }>
            <h3 className={ styles.h3 }>Все 10 аватаров, + консультация и прогностика на 2 года</h3>
            <p className={ styles.text }>Стоимость - 20 000 руб</p>
            <Button
              onClick={ () => {
                console.log('asdasd')
                setTitle('Получить все 10 аватаров, + консультация и прогностика на 2 года');
                setPosId(2);
                setPrice(20000);
                openModal10();
              } }
              className={ styles.btn }>Записаться</Button>
          </div>
          <div className={ `${styles.img} ${styles.img3}` }>
            <img src={ '/images/icon/char7.png' } alt='консультация и прогностика на 2 года' />
          </div>
        </Form>
        <Form className={ styles.form } >
          <div className={ styles.text_block }>
            <h3 className={ styles.h3 }>Прогностика на год</h3>
            <p className={ styles.text }>Стоимость - 1000 руб</p>
            <Button
              onClick={ () => {
                setTitle('Записаться на прогностику на год');
                setPosId(1);
                setPrice(1000);
                openModal();
              } }
              className={ styles.btn }>Записаться</Button>
          </div>
          <div className={ `${styles.img} ${styles.img4}` }>
            <img src={ '/images/icon/char8.png' } alt='Прогностика на год'/>
          </div>
        </Form>
      </div>

      { isModalCalcOpen && <ModalCalc onClose={ closeModalCalc } /> }
      { isModalOpen && <Modal onClose={ closeModal } title={title} posId={ posId } price={ price } /> }
    </section>
  );
};
