import { Button, Form } from '@@/components/ui';
import styles from './ToolDescription.module.css';
import { useState } from 'react';
import { ModalCalc } from '../Modal/ModalCalculator';
import { Modal } from '../Modal/Modal';
import Accordion from '@@/components/ui/Accordion/Accordion';

// Единый источник правды по услугам: названия и цены
const SERVICES = {
  FULL_ANALYSIS: {
    id: 2,
    title: 'Полный и глубокий разбор ваших Аватаров личности',
    price: 7000,
  },
  PERSONAL_CONSULT: {
    id: 1,
    title: 'Личная консультация + стратегия',
    price: 20000,
  },
  YEAR_FORECAST: {
    id: 1,
    title: 'Годовой прогноз',
    price: 3000,
  },
};

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
    <section className={ styles.section }>
      <div className={ styles.stars_map }></div>
      <h2 className={ styles.title } id='services'>Мы предлагаем  <span style={ { color: 'rgb(255, 225, 6)' } }>новый инструмент </span><br /> для самопознания</h2>
      <p className={ styles.description }>
        Он помогает ответить на важные жизненные вопросы: "Кто я?" и "Как реализовать свой потенциал?". Используя вашу дату рождения и психологические типирования, он указывает на ваши таланты и способности, которые помогут достигать целей. Откройте гармоничную и осознанную жизнь с нашим уникальным методом!
      </p>

      <div className={ styles.form_block }>
        <Form className={ styles.form } >
          <div className={ styles.text_block }>


            <h3 className={ styles.h3 }>
              {SERVICES.FULL_ANALYSIS.title} — {SERVICES.FULL_ANALYSIS.price} руб.
            </h3>
            <p className={ styles.text }>PDF-документ 20–40 страниц с конкретными рекомендациями без воды и мистики.</p>
            <Accordion title='Внутри:' className={ styles.accordion }>
              <ul className={ styles.text }>
                <li>характер и внутренние конфликты</li>
                <li>деньги - где ваш рост</li>
                <li>сценарии отношений</li>
                <li>точки выгорания</li>
                <li>подсказки по здоровью и энергии</li>
                <li>какие решения принимать - и когда лучше подождать</li>
                <li>конкретные шаги, а не общие советы</li>
              </ul>
            </Accordion>

            <p className={ styles.text }>Кому подходит: если хотите разобраться в себе и перестать повторять одни и те же ошибки.</p>

            <Button onClick={ openModalCalc } className={ styles.btn }>Заказать полный разбор</Button>
          </div>
          <div className={ `${styles.img} ${styles.img1}` }>
            <img src={ '/images/icon/cart.png' } alt='Полный разбор ваших Аватаров личности' />
          </div>
        </Form>
        <Form className={ styles.form } >
          <div className={ styles.text_block }>


            <h3 className={ styles.h3 }>
              {SERVICES.PERSONAL_CONSULT.title} – {SERVICES.PERSONAL_CONSULT.price} руб.
            </h3>
            <p className={ styles.text }>90 минут в видео  онлайн формате — мы разбираем ваших Аватаров и составляем план изменений на 3–6 месяцев.</p>
            <Accordion title='Результат:' className={ styles.accordion }>
              <ul className={ styles.text }>
                <li>ясность в решениях</li>
                <li>понимание, куда двигаться</li>
                <li>ощущение контроля над жизнью</li>
                <li>ощутимые шаги (а не теория)</li>
              </ul>
            </Accordion>

            <Accordion title='Как проходит:' className={ styles.accordion }>
              <ul className={ styles.text }>
                <li>я изучаю ваших Аватаров</li>
                <li>мы встречаемся онлайн</li>
                <li>разбираем ваши  вопросы</li>
                <li>вы получаете план действий</li>
              </ul>
            </Accordion>

            <Accordion title='Частые запросы:' className={ styles.accordion }>
              <ul className={ styles.text }>
                <li>деньги и предназначение</li>
                <li>отношения</li>
                <li>выбор направления</li>
                <li>выгорание</li>
                <li>почему всё повторяется?</li>
              </ul>
            </Accordion>


            <Button
              onClick={ () => {
                setTitle(SERVICES.PERSONAL_CONSULT.title);
                setPosId(SERVICES.PERSONAL_CONSULT.id);
                setPrice(SERVICES.PERSONAL_CONSULT.price);
                openModal();
              } }
              className={ styles.btn }>Записаться</Button>
          </div>
          <div className={ `${styles.img} ${styles.img2}` }>
            <img src={ '/images/icon/char6.png' } alt='Личная консультация + стратегия' />
          </div>
        </Form>
        <Form className={ styles.form } >
          <div className={ styles.text_block }>
            <h3 className={ styles.h3 }>
              {SERVICES.YEAR_FORECAST.title.toUpperCase()} – {SERVICES.YEAR_FORECAST.price} руб.
            </h3>
            <p className={ styles.text }>Ваш личный план на год: периоды роста, риск-зоны, лучшие решения</p>
            <p className={ styles.text }>Не “предсказания”, а понимание — когда лучше начинать, развивать, отдыхать и усиливаться.</p>
            <Accordion title='Внутри:' className={ styles.accordion }>
              <ul className={ styles.text }>
                <li>ключевые темы года</li>
                <li>денежные периоды</li>
                <li>важные точки принятия решений</li>
                <li>где стоит быть осторожнее</li>
              </ul>
            </Accordion>
            <p className={ styles.text }>Подходит тем, кто хочет прожить год осознанно и эффективно.</p>
            <Button
              onClick={ () => {
                setTitle(SERVICES.YEAR_FORECAST.title);
                setPosId(SERVICES.YEAR_FORECAST.id);
                setPrice(SERVICES.YEAR_FORECAST.price);
                openModal();
              } }
              className={ styles.btn }>Получить годовой план</Button>

          </div>
          <div className={ `${styles.img} ${styles.img3}` }>
            <img src={ '/images/icon/char7.png' } alt='Получить годовой план' />
          </div>
        </Form>
      </div>

      { isModalCalcOpen && <ModalCalc onClose={ closeModalCalc } /> }
      { isModalOpen && <Modal onClose={ closeModal } title={ title } posId={ posId } price={ price } /> }
    </section>
  );
};
