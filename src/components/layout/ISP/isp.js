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
              <p>
                Система аватаров не предсказывает будущее - она показывает, почему именно с вами всё происходит так, как происходит, и как это изменить.
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
      { isModalOpen && <ModalCalc onClose={ closeModal } /> }
    </section>
  );
};
