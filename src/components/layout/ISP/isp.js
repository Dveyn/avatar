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
              Метод Аватаров основан на дате вашего рождения, психологии типирования личностей, подходе IFS и коучинге.
              <p>
                Аватары помогут вам понять, почему вы ведете себя так или иначе в разных ситуациях. Они дают возможность лучше разобраться в себе и своих эмоциях, быстрее и легче достичь целей, которые не могли реализовать годами, наладить бизнес, отношения, здоровье.
              </p>

              <Button onClick={openModal}>Рассчитать своих аватаров</Button>
            </div>

          </div>

        </Form>
      </div>
      { isModalOpen && <ModalCalc onClose={ closeModal } /> }
    </section>
  );
};
