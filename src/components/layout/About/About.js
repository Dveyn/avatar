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
              `.${styles.circle}`,
              { opacity: 0, scale: 0.8 },
              { opacity: 1, scale: 1, duration: 1 }
            )
            .fromTo(
              `.${styles.pos1}`,
              { opacity: 0, y: 50 },
              { opacity: 1, y: 0, duration: 1 },
              '-=0.5'
            )
            .addPause('+=5.5')
            .to(`.${styles.pos1}`, { opacity: 0, duration: 1 })
            .fromTo(
              `.${styles.pos2}`,
              { opacity: 0 },
              { opacity: 1, y: 0, duration: 1 }
            )
            .addPause('+=5.5')
            .to(`.${styles.circle}`, { opacity: 0, duration: 1 })
            .fromTo(
              `.${styles.center}`,
              { opacity: 0 },
              { opacity: 1, duration: 1 }
            )
            .fromTo(
              `.${styles.char_box}`,
              { opacity: 1 },
              { opacity: 1, duration: 1 }
            )
            .fromTo(
              `.${styles.char_text1}`,
              { opacity: 0 },
              { opacity: 1, duration: 1 }
            )
            .fromTo(
              `.${styles.char_text2}`,
              { opacity: 0 },
              { opacity: 1, duration: 1 }
            )
            .fromTo(
              `.${styles.char_text3}`,
              { opacity: 0 },
              { opacity: 1, duration: 1 }
            )
            .fromTo(
              `.${styles.char_text4}`,
              { opacity: 0 },
              { opacity: 1, duration: 1 }
            )
            .fromTo(
              `.${styles.char_text5}`,
              { opacity: 0 },
              { opacity: 1, duration: 1 }
            )
            .fromTo(
              `.${styles.char_text6}`,
              { opacity: 0 },
              { opacity: 1, duration: 1 }
            );
        },
        // Анимация для мобильных устройств
        "(max-width: 767px)": () => {
          timeline
            .fromTo(
              `.${styles.circle}`,
              { opacity: 0, scale: 0.8 },
              { opacity: 1, scale: 1, duration: 1 }
            )
            .fromTo(
              `.${styles.pos1}`,
              { opacity: 0, y: 50 },
              { opacity: 1, y: 0, duration: 1 },
              '-=0.5'
            )
            .addPause('+=10')
            .to(`.${styles.pos1}`, { opacity: 0, duration: 1 })
            .fromTo(
              `.${styles.pos2}`,
              { opacity: 0 },
              { opacity: 1, y: 0, duration: 1 }
            )
            .addPause('+=10')
            .to(`.${styles.circle}`, { opacity: 0, duration: 1 })
            .fromTo(
              `.${styles.center}`,
              { opacity: 0 },
              { opacity: 1, duration: 1 }
            )
            .fromTo(
              `.${styles.char_box}`,
              { opacity: 1 },
              { opacity: 1, duration: 1 }
            )
            .fromTo(
              `.${styles.char_text1}`,
              { opacity: 0 },
              { opacity: 1, duration: 1 }
            )
            .addPause('+=10')
            .to(`.${styles.char_text1}`, { opacity: 0, duration: 1 }) // Исчезновение char_text1
            .fromTo(
              `.${styles.char_text2}`,
              { opacity: 0 },
              { opacity: 1, duration: 1 }
            )
            .addPause('+=10')
            .to(`.${styles.char_text2}`, { opacity: 0, duration: 1 }) // Исчезновение char_text1
            .fromTo(
              `.${styles.char_text3}`,
              { opacity: 0 },
              { opacity: 1, duration: 1 }
            ).addPause('+=10')
            .to(`.${styles.char_text3}`, { opacity: 0, duration: 1 }) // Исчезновение char_text1
            .fromTo(
              `.${styles.char_text4}`,
              { opacity: 0 },
              { opacity: 1, duration: 1 }
            ).addPause('+=10')
            .to(`.${styles.char_text4}`, { opacity: 0, duration: 1 }) // Исчезновение char_text1
            .fromTo(
              `.${styles.char_text5}`,
              { opacity: 0 },
              { opacity: 1, duration: 1 }
            ).addPause('+=10')
            .to(`.${styles.char_text5}`, { opacity: 0, duration: 1 }) // Исчезновение char_text1
            .fromTo(
              `.${styles.char_text6}`,
              { opacity: 0 },
              { opacity: 1, duration: 1 }
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
    <section className={ styles.about }>
      <div className={ styles.voln }></div>
      <div className={ styles.circle }>
        <div className={ styles.pos1 }>
          <div className={ styles.text1 }>В первую очередь - познай себя</div>
          <img className={ styles.book } src='/images/icon/book.png' />
        </div>
        <div className={ styles.pos2 }> <div className={ styles.text2 }>Так говорили мудрецы еще в древние времена и сегодня это правило тоже работает</div>
        </div>
      </div>
      <div className={ styles.char_box }>
        <div className={ styles.left }>
          <div className={ styles.char_text1 }>Как увеличить доход?</div>
          <div className={ styles.char_text2 }>Как узнать, чего я на самом деле хочу?</div>
          <div className={ styles.char_text3 }>Что тормозит на пути к цели?</div>
        </div>
        <div className={ styles.center }>
          <img className={ styles.char } src='/images/icon/char3.png' />
          <Button onClick={openModal} className={ styles.btn }>Вижу свой запрос. Что дальше?</Button>
        </div>
        <div className={ styles.right }>
          <div className={ styles.char_text4 }>Как найти партнера для жизни?</div>
          <div className={ styles.char_text5 }>Почему не идёт бизнес? </div>
          <div className={ styles.char_text6 }>Нет сил ни на работу, ни на семью</div>
        </div>
      </div>
      { isModalOpen && <ModalCalc onClose={ closeModal } /> }
    </section>
  );
};

export default About;
