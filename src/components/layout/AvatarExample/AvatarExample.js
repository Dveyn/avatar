import { useEffect, useRef } from 'react';
import { Advantages, ButtonLine } from '@@/components/ui';
import styles from './AvatarExample.module.css';

export const AvatarExample = () => {
  const textRef = useRef(null); // Убираем типизацию для совместимости с SSR
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
          trigger: `.${styles.advantages_block}`,
          start: 'top top',
          end: '1800 bottom',
          scrub: true,
          pin: true,
        },
      });

      timeline.fromTo(
        `.${styles.advantages}`,
        { x: 0 },
        { x: -1400, duration: 2 }
      );
    };

    if (window.innerWidth > 768) {
      initAnimations();
    }
  }, []);

  useEffect(() => {
    let gsap;
    let ScrollTrigger;
    let TextPlugin;

    const initTextAnimation = async () => {
      if (typeof window === 'undefined') return;

      const module = await import('gsap');
      gsap = module.gsap;
      ScrollTrigger = (await import('gsap/ScrollTrigger')).ScrollTrigger;
      TextPlugin = (await import('gsap/TextPlugin')).TextPlugin;

      gsap.registerPlugin(ScrollTrigger, TextPlugin);

      const textElement = textRef.current;
      if (textElement) {
        const originalText = textElement.innerHTML; // Сохраняем оригинальный текст
        textElement.innerHTML = ''; // Очищаем текст перед анимацией

        gsap.to(textElement, {
          text: originalText,
          duration: 3,
          ease: 'power1.inOut',
          scrollTrigger: {
            trigger: textElement, // Элемент, при достижении которого запускается анимация
            start: 'top 80%',
          },
        });
      }
    };

    initTextAnimation();
  }, []);

  return (
    <section className={ styles.section } id='advantages'>
      <div className={ styles.img_box }>
        <img src="/images/icon/char10.png" alt="личные ресурсы" />
        <h2 ref={ textRef } className={ styles.text }>
          Знание своих Аватаров = знание себя
        </h2>
      </div>
      <ButtonLine className={ styles.btn } />
      <div className={ styles.advantages_block }>
        <h2 className={ styles.title }>Аватары - ваш ключ к:</h2>
        <Advantages />
        <div className={ styles.advantages }>
          <div className={ styles.item }>
            <div className={ styles.item_img }>
              <img src={ '/images/icon/весы.png' } alt='Понимание своих эмоций' />
            </div>
            <div className={ styles.item_title }>Эмоциональной устойчивости и балансу</div>
            <div className={ styles.item_desc }>Когда человек понимает свои эмоции, он лучше справляется с негативными ситуациями и сохраняет внутреннее равновесие. Знание теневых сторон позволяет не подавлять их, а конструктивно работать с ними.</div>
          </div>
          <div className={ styles.item }>
            <div className={ styles.item_img }>
              <img src={ '/images/icon/чаша.png' } alt="Развитие личных ресурсов" />
            </div>
            <div className={ styles.item_title }>Развитию личных ресурсов</div>
            <div className={ styles.item_desc }>Понимание своих сильных сторон помогает лучше использовать их для достижения целей. Человек становится более эффективным, так как знает, в каких областях он особенно силён и как лучше направить свою энергию.</div>
          </div>
          <div className={ styles.item }>
            <div className={ styles.item_img }>
              <img src={ '/images/icon/starts.png' } alt='Разширение возможностей' />
            </div>
            <div className={ styles.item_title }>Расширению возможностей</div>
            <div className={ styles.item_desc }>Человек, осознающий свои ресурсы и ограничения, может более точно ставить цели и достигать их, находя оптимальные пути для реализации своего потенциала.</div>
          </div>
          <div className={ styles.item }>
            <div className={ styles.item_img }>
              <img src={ '/images/icon/key.png' } alt="Улучшение отношений"/>
            </div>
            <div className={ styles.item_title }> Улучшению отношений</div>
            <div className={ styles.item_desc }>Знание себя даёт возможность лучше понимать других людей, быть более эмпатичным, что улучшает как личные, так и профессиональные отношения.</div>
          </div>
          <div className={ styles.item }>
            <div className={ styles.item_img }>
              <img src={ '/images/icon/fire.png' } alt="Повышение уверенности"/>
            </div>
            <div className={ styles.item_title }>Повышению уверенности</div>
            <div className={ styles.item_desc }>
              Осознанность своих сильных и слабых сторон создаёт реалистичную самооценку. Это повышает уверенность в себе, так как человек опирается на реальные знания о своих возможностях и ресурсах.
            </div>
          </div>
          <div className={ styles.item }>
            <div className={ styles.item_img }>
              <img src={ '/images/icon/glass.png' } alt='Повышение осознанности'/>
            </div>
            <div className={ styles.item_title }>Повышению осознанности</div>
            <div className={ styles.item_desc }>
              Человек осознаёт, что движет его действиями, почему возникают те или иные реакции. Это помогает принимать более взвешенные решения и меньше поддаваться внешним раздражителям.
            </div>
          </div>
          <div className={ styles.item }>
            <div className={ styles.item_img }>
              <img src={ '/images/icon/rubin.png' } alt="Способность к самокоррекции"/>
            </div>
            <div className={ styles.item_title }>Способности <br /> к самокоррекции</div>
            <div className={ styles.item_desc }>
              Знание теневых проявлений позволяет осознавать, какие черты или паттерны поведения могут мешать успеху или счастью. Это помогает изменить их, работая над собой осознанно.
            </div>
          </div>
          <div className={ styles.item }>
            <div className={ styles.item_img }>
              <img src={ '/images/icon/draco.png' } alt="Освобождение от конфликтов"/>
            </div>
            <div className={ styles.item_title }>Освобождению от внутренних конфликтов</div>
            <div className={ styles.item_desc }>Принятие своих теневых сторон помогает интегрировать их в общую картину личности, что снимает внутренние конфликты и освобождает энергию для созидания и роста.</div>
          </div>
        </div>
      </div>
      <div className={ styles.end } id='aboutmethod'>
        <div className={ styles.end_text }>
          Знание себя{ ' ' }
          <span style={ { color: "rgb(255, 225, 6)" } }>помогает человеку</span>{ ' ' }
          жить более гармоничной, целенаправленной и осознанной жизнью.
        </div>
        <div className={ styles.end_char_box }>
          <img className={ styles.end_char } src={ '/images/icon/char11.png' } alt="типы личности"/>
          <img className={ styles.end_stars } src={ '/images/icon/stars_map.png' } alt='матрица судьбы' />
        </div>
      </div>
    </section>
  );
};
