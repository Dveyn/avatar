import { useEffect } from 'react';
import styles from './About.module.css';

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
              `.${styles.char}`,
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
              `.${styles.char}`,
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
            );
        },
      });
    };
  
    initAnimations();
  
  }, []);

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
        <div className={ styles.char_text1 }>Кто как ни ты знает чего ты хочешь?</div>
        <img className={ styles.char } src='/images/icon/char3.png' />
        <div className={ styles.char_text2 }>Кто как не ты знает свои ресурсы и возможности?</div>
      </div>
    </section>
  );
};

export default About;
