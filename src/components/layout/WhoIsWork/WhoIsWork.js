import { Button, Form } from "@@/components/ui";
import styles from './WhoIsWork.module.css';
import { ModalCalc } from "../Modal/ModalCalculator";
import { useState } from "react";

export const WhoIsWork = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <section className={ styles.section2 }>
      <h2 className={ styles.title }>Почему это работает</h2>
      <div className={ styles.one_box }>
        <Form className={ styles.form }>
          <div className={ styles.form_box }>
            <div className={ styles.text }>
              <p>
              Многие сервисы выдают автоматические расчёты — но они не объясняют, что делать с этими данными. На нашем сайте:
              </p>
              <ul>
                <li>глубокий разбор личности</li>
                <li>реальные рекомендации по деньгам и развитию</li>
                <li>план действий, а не просто цифры или шаблоны</li>
                <li>легко применять к реальной жизни</li>
                <li>это не гадание — это практичная система самопонимания, которая работает.</li>
              </ul>
            </div>
          </div>

        </Form>
      </div>
    </section>
  );
};
