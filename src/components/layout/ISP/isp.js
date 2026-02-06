import { Button, Form } from "@@/components/ui";
import styles from './isp.module.css';
import { ModalCalc } from "../Modal/ModalCalculator";
import { useState } from "react";

export const ISP = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <section className={ styles.section2 }>
        <div className={ styles.one_box }>
          <Form className={ styles.form }>
            <div className={ styles.form_box }>
              <div className={ styles.text }>
                <p>
                  Мой метод «Аватар личности» показывает, где вы теряете энергию,  ваши сильные стороны, финансовый потенциал и ключевые жизненные темы, чтобы принимать решения уверенно.
                </p>
                <p>Просто знать — мало. Важно понять, что с этим делать именно вам!</p>
                <p> Моя система - это индивидуальная расшифровка + прикладной план, основанный на:</p>
                <ul>
                  <li>Дате вашего рождения</li>
                  <li>Типировании личности</li>
                  <li>IFS (система терапии субличностей)</li>
                  <li>Коучинговой практике</li>
                </ul>
                <Button className={ styles.btn } onClick={ openModal }>ИНТЕРЕСНО! ХОЧУ УЗНАТЬ СВОИХ АВАТАРОВ</Button>
              </div>
            </div>

          </Form>
        </div>
      </section>
      { isModalOpen && <ModalCalc onClose={ closeModal } /> }
    </>
  );
};
