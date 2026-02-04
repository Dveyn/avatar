import { Button, Form } from "@@/components/ui";
import styles from './ThisIsForYou.module.css';
import { ModalCalc } from "../Modal/ModalCalculator";
import { useState } from "react";

export const ThisIsForYou = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <section className={ styles.section2 }>
      <h2 className={ styles.title }>Это для вас, если…</h2>
      <div className={ styles.one_box }>
        <Form className={ styles.form }>
          <div className={ styles.form_box }>
            <div className={ styles.text }>
              <ul>
                <li>застряли в одном месте</li>
                <li>деньги приходят рывками или не приходят совсем</li>
                <li>повторяются одни и те же сценарии в отношениях</li>
                <li>трудно понять — что моё, а что я делаю “потому что надо”</li>
                <li>много знаний, но мало внутреннего спокойствия</li>
                <li>постоянно не хватает энергии</li>
                <li>хотите ясность, направление и конкретные шаги</li>
              </ul>
            </div>
          </div>

        </Form>
      </div>
    </section>
  );
};
