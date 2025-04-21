import { Button, Form } from "@@/components/ui";
import styles from './isp.module.css';
import { ModalCalc } from "../Modal/ModalCalculator";
import { useState } from "react";

export const ISP = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <section className={ styles.section2 }>
      <div className={ styles.one_box }>
        <Form className={ styles.form }>
          <div className={ styles.form_box }>
            <div className={ styles.text }>

              Метод Аватаров  основан дате вашего рождения, психологии типирования личностей, подходе IFS (системной терапии субличностей) и коучинге.
              <p>
                Твой аватар — это визуальный и энергетический образ твоей личности, основанный на дате рождения.
                Он раскрывает то, что ты чувствовал, но не могл сформулировать словами.
              </p>
              <p>   Аватары - ваш ключ к счастливой и успешной жизни.
              </p>

              <Button className={ styles.btn } onClick={ openModal }>ИНТЕРЕСНО! ХОЧУ УЗНАТЬ СВОИХ АВАТАРОВ</Button>
            </div>

          </div>

        </Form>
      </div>
      { isModalOpen && <ModalCalc onClose={ closeModal } /> }
    </section>
  );
};
