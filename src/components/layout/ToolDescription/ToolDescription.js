import { Button, Form } from '@@/components/ui';
import styles from './ToolDescription.module.css';
import { useState } from 'react';
import { ModalCalc } from '../Modal/ModalCalculator';
import { Modal } from '../Modal/Modal';
import Accordion from '@@/components/ui/Accordion/Accordion';

const SERVICES = {
  FULL_ANALYSIS: { id: 2, title: 'Полный и глубокий разбор ваших Аватаров личности', price: 7000 },
  PERSONAL_CONSULT: { id: 1, title: 'Личная консультация + стратегия', price: 20000 },
  YEAR_FORECAST: { id: 1, title: 'Годовой прогноз', price: 3000 },
};

export const ToolDescription = () => {
  const [title, setTitle] = useState('');
  const [posId, setPosId] = useState(null);
  const [price, setPrice] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalCalcOpen, setIsModalCalcOpen] = useState(false);

  // Хранит индекс открытого аккордеона в каждом блоке
  const [openAccordionIndex, setOpenAccordionIndex] = useState({});

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openModalCalc = () => setIsModalCalcOpen(true);
  const closeModalCalc = () => setIsModalCalcOpen(false);

  const handleAccordionToggle = (blockId, index) => {
    setOpenAccordionIndex(prev => ({
      ...prev,
      [blockId]: prev[blockId] === index ? null : index, // открываем один, остальные закрываются
    }));
  };

  return (
    <section className={styles.section}>
      <div className={styles.stars_map}></div>
      <h2 className={styles.title} id='services'>
        Мы предлагаем <span style={{ color: 'rgb(255, 225, 6)' }}>новый инструмент </span>
        <br /> для самопознания
      </h2>
      <p className={styles.description}>
        Он помогает ответить на важные жизненные вопросы: "Кто я?" и "Как реализовать свой потенциал?"...
      </p>

      <div className={styles.form_block}>
        {/* FULL_ANALYSIS */}
        <Form className={styles.form}>
          <div className={styles.text_block}>
            <h3 className={styles.h3}>
              {SERVICES.FULL_ANALYSIS.title} — {SERVICES.FULL_ANALYSIS.price} руб.
            </h3>
            <p className={styles.text}>PDF-документ 20–40 страниц с конкретными рекомендациями...</p>

            <Accordion
              title='Внутри:'
              className={styles.accordion}
              isOpen={openAccordionIndex['FULL_ANALYSIS'] === 0}
              onToggle={() => handleAccordionToggle('FULL_ANALYSIS', 0)}
            >
              <ul className={styles.text}>
                <li>характер и внутренние конфликты</li>
                <li>деньги - где ваш рост</li>
                <li>сценарии отношений</li>
                <li>точки выгорания</li>
                <li>подсказки по здоровью и энергии</li>
                <li>какие решения принимать - и когда лучше подождать</li>
                <li>конкретные шаги, а не общие советы</li>
              </ul>
            </Accordion>

            <p className={styles.text}>Кому подходит: если хотите разобраться в себе...</p>
            <Button onClick={openModalCalc} className={styles.btn}>Заказать полный разбор</Button>
          </div>
        </Form>

        {/* PERSONAL_CONSULT */}
        <Form className={styles.form}>
          <div className={styles.text_block}>
            <h3 className={styles.h3}>
              {SERVICES.PERSONAL_CONSULT.title} – {SERVICES.PERSONAL_CONSULT.price} руб.
            </h3>
            <p className={styles.text}>90 минут в видео онлайн формате...</p>

            {['Результат:', 'Как проходит:', 'Частые запросы:'].map((title, i) => (
              <Accordion
                key={i}
                title={title}
                className={styles.accordion}
                isOpen={openAccordionIndex['PERSONAL_CONSULT'] === i}
                onToggle={() => handleAccordionToggle('PERSONAL_CONSULT', i)}
              >
                <ul className={styles.text}>
                  {title === 'Результат:' && (
                    <>
                      <li>ясность в решениях</li>
                      <li>понимание, куда двигаться</li>
                      <li>ощущение контроля над жизнью</li>
                      <li>ощутимые шаги (а не теория)</li>
                    </>
                  )}
                  {title === 'Как проходит:' && (
                    <>
                      <li>я изучаю ваших Аватаров</li>
                      <li>мы встречаемся онлайн</li>
                      <li>разбираем ваши вопросы</li>
                      <li>вы получаете план действий</li>
                    </>
                  )}
                  {title === 'Частые запросы:' && (
                    <>
                      <li>деньги и предназначение</li>
                      <li>отношения</li>
                      <li>выбор направления</li>
                      <li>выгорание</li>
                      <li>почему всё повторяется?</li>
                    </>
                  )}
                </ul>
              </Accordion>
            ))}

            <Button
              onClick={() => {
                setTitle(SERVICES.PERSONAL_CONSULT.title);
                setPosId(SERVICES.PERSONAL_CONSULT.id);
                setPrice(SERVICES.PERSONAL_CONSULT.price);
                openModal();
              }}
              className={styles.btn}
            >
              Записаться
            </Button>
          </div>
        </Form>

        {/* YEAR_FORECAST */}
        <Form className={styles.form}>
          <div className={styles.text_block}>
            <h3 className={styles.h3}>
              {SERVICES.YEAR_FORECAST.title.toUpperCase()} – {SERVICES.YEAR_FORECAST.price} руб.
            </h3>
            <p className={styles.text}>Ваш личный план на год: периоды роста, риск-зоны, лучшие решения</p>
            <Accordion
              title='Внутри:'
              className={styles.accordion}
              isOpen={openAccordionIndex['YEAR_FORECAST'] === 0}
              onToggle={() => handleAccordionToggle('YEAR_FORECAST', 0)}
            >
              <ul className={styles.text}>
                <li>ключевые темы года</li>
                <li>денежные периоды</li>
                <li>важные точки принятия решений</li>
                <li>где стоит быть осторожнее</li>
              </ul>
            </Accordion>
            <Button
              onClick={() => {
                setTitle(SERVICES.YEAR_FORECAST.title);
                setPosId(SERVICES.YEAR_FORECAST.id);
                setPrice(SERVICES.YEAR_FORECAST.price);
                openModal();
              }}
              className={styles.btn}
            >
              Получить годовой план
            </Button>
          </div>
        </Form>
      </div>

      {isModalCalcOpen && <ModalCalc onClose={closeModalCalc} />}
      {isModalOpen && <Modal onClose={closeModal} title={title} posId={posId} price={price} />}
    </section>
  );
};
