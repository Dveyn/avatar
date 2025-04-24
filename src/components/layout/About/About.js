import { useEffect, useState } from 'react';
import styles from './About.module.css';
import { Button } from '@@/components/ui';
import { ModalCalc } from '../Modal/ModalCalculator';

export const About = () => {
  useEffect(() => {
    let gsap;
    let ScrollTrigger;

    const initAnimations = async () => {
      const module = await import('gsap');
      gsap = module.gsap;
      ScrollTrigger = (await import('gsap/ScrollTrigger')).ScrollTrigger;

      gsap.registerPlugin(ScrollTrigger);

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: `.${styles.about}`,
          start: 'top top',
          end: 'bottom+=1200 bottom',
          scrub: true,
          pin: true,
        },
      });

      // Логика для анимации
      ScrollTrigger.matchMedia({
        // Анимация для десктопа
        "(min-width: 768px)": () => {
          timeline
            .fromTo(
              `.${styles.circle1}`,
              { opacity: 0, scale: 0.8 },
              { opacity: 1, scale: 1, duration: 1 }
            )
            .fromTo(
              `.${styles.pos1}`,
              { opacity: 0, y: 50 },
              { opacity: 1, y: 0, duration: 1 },
              '-=0.5'
            )
            .fromTo(
              `.${styles.circle2}`,
              { opacity: 0, scale: 0.8 },
              { opacity: 1, scale: 1, duration: 1 }
            )
            .fromTo(
              `.${styles.pos2}`,
              { opacity: 0, y: 50 },
              { opacity: 1, y: 0, duration: 1 },
              '-=0.5'
            )
            .fromTo(
              `.${styles.circle3}`,
              { opacity: 0, scale: 0.8 },
              { opacity: 1, scale: 1, duration: 1 }
            )
            .fromTo(
              `.${styles.pos3}`,
              { opacity: 0, y: 50 },
              { opacity: 1, y: 0, duration: 1 },
              '-=0.5'
            )
            .fromTo(
              `.${styles.circle4}`,
              { opacity: 0, scale: 0.8 },
              { opacity: 1, scale: 1, duration: 1 }
            )
            .fromTo(
              `.${styles.pos4}`,
              { opacity: 0, y: 50 },
              { opacity: 1, y: 0, duration: 1 },
              '-=0.5'
            );
        },
        // Анимация для мобильных устройств
        "(max-width: 767px)": () => {
          timeline
            .fromTo(
              `.${styles.circle1}`,
              { opacity: 0, scale: 0.8 },
              { opacity: 1, scale: 1, duration: 1 }
            )
            .fromTo(
              `.${styles.pos1}`,
              { opacity: 0, y: 50 },
              { opacity: 1, y: 0, duration: 1 },
              '-=0.5'
            )
            .fromTo(
              `.${styles.circle2}`,
              { opacity: 0, scale: 0.8 },
              { opacity: 1, scale: 1, duration: 1 }
            )
            .fromTo(
              `.${styles.pos2}`,
              { opacity: 0, y: 50 },
              { opacity: 1, y: 0, duration: 1 },
              '-=0.5'
            )
            .fromTo(
              `.${styles.circle3}`,
              { opacity: 0, scale: 0.8 },
              { opacity: 1, scale: 1, duration: 1 }
            )
            .fromTo(
              `.${styles.pos3}`,
              { opacity: 0, y: 50 },
              { opacity: 1, y: 0, duration: 1 },
              '-=0.5'
            )
            .fromTo(
              `.${styles.circle4}`,
              { opacity: 0, scale: 0.8 },
              { opacity: 1, scale: 1, duration: 1 }
            )
            .fromTo(
              `.${styles.pos4}`,
              { opacity: 0, y: 50 },
              { opacity: 1, y: 0, duration: 1 },
              '-=0.5'
            );
        },
      });
    };

    initAnimations();

  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <section className={styles.about}>
      <div className={styles.voln}></div>
      <div className={styles.circles_container}>
        <div className={`${styles.circle} ${styles.circle1}`}>
          <div className={styles.pos1}>
            <div className={styles.text1}>Что ты получишь?</div>
            <img className={styles.book} src='/images/icon/book.png' alt='матрица судьбы' />
          </div>
        </div>

        <div className={`${styles.circle} ${styles.circle2}`}>
          <div className={styles.pos2}>
            <div className={styles.text2}>
              Индивидуальный аватар личности с описанием твоих сильных сторон
            </div>
          </div>
        </div>

        <div className={`${styles.circle} ${styles.circle3}`}>
          <div className={styles.pos3}>
            <div className={styles.text3}>
              Энергетический профиль: что тебе даёт силу, а что забирает
            </div>
          </div>
        </div>

        <div className={`${styles.circle} ${styles.circle4}`}>
          <div className={styles.pos4}>
            <div className={styles.text4}>
              Подсказки: куда двигаться в профессии и развитии, как легче выстраивать отношения, как расшить финансовый поток.
            </div>
          </div>
        </div>
      </div>
      <Button onClick={openModal} className={styles.btn}>Вижу свой запрос. Что дальше?</Button>
      {isModalOpen && <ModalCalc onClose={closeModal} />}
    </section>
  );
};

export default About;
