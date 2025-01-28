import { ButtonLine, Form } from '@@/components/ui';
import styles from './Method.module.css';
import { useEffect } from 'react';

export const Method = () => {

  useEffect(() => {
    let gsap;
    let ScrollTrigger;

    const initAnimations = async () => {
      // eslint-disable-next-line @next/next/no-assign-module-variable
      const module = await import('gsap');
      gsap = module.gsap;
      ScrollTrigger = (await import('gsap/ScrollTrigger')).ScrollTrigger;

      gsap.registerPlugin(ScrollTrigger);
      if (window.innerWidth > 768) {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: `.${styles.box}`,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
          },
        });

        timeline.fromTo(
          `.${styles.char}`,
          { scale: 0.5 },
          { scale: 0.9 }
        );
      }

    };

    initAnimations();

  }, []);


  useEffect(() => {
    const initAnimations = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
  
      gsap.registerPlugin(ScrollTrigger);
  
      if (window.innerWidth <= 768) {
        const char = document.querySelector(`.${styles.char}`);
        const char2 = document.querySelector(`.${styles.char2}`);
        const card = document.querySelector(`.${styles.card}`);
  
        if (char && char2 && card) {
          ScrollTrigger.create({
            trigger: card,
            start: 'center center', // Когда верх card достиг центра экрана
            end: 'bottom center', // Когда низ card выходит из центра экрана
            onEnter: () => {
              // Скрываем внешний персонаж, показываем внутреннего
              char.classList.add(`${styles.hidden}`);
              char2.classList.add(`${styles.visible}`);
            },
            onLeaveBack: () => {
              // Возвращаем персонажа обратно
              char.classList.remove(`${styles.hidden}`);
              char2.classList.remove(`${styles.visible}`);
            },
          });
        }
      }
    };
  
    initAnimations();
  }, []);

  return (
    <div className={ styles.box }>
      <section className={ styles.section }></section>
      <section className={ styles.sectionChar }>
        <img className={ styles.char } src="/images/icon/char9.png" alt="Персонаж" />
      </section>
      <section className={ styles.section2 }>
        <div className={ styles.one_box }>
          <Form className={ styles.form }>
            <div className={ styles.form_box }>
              <div className={ styles.text }>
                Наш метод основан на дате вашего рождения, психологии типирования личностей, подходе IFS и коучинге.
                <p>
                  Каждый человек индивидуален и это делает нашу жизнь ярче. Все мы мыслим и действуем по-своему. Нет правильных и неправильных людей. Аватары помогают людям понять – как бы ты не мыслил – это нормально, точно так же нормальны остальные.
                </p>
              </div>
            </div>
          </Form>
        </div>
      </section>
      <section className={ styles.section3 }>
        <div className={ styles.info }>
          <div className={ `${styles.text_block} ${styles.text_block1}` }>
            <div className={ styles.dialog }>
              <span className={ styles.text1 }>Путешественник Души</span>
              <span className={ styles.text2 }> шут, свобода</span>
            </div>
            <div className={ styles.title }>О персонаже</div>
            <div className={ styles.feature_block }>
              <div className={ styles.feature }>
                <div className={ styles.item }>характер</div>
                <div className={ styles.dots }></div>
                <div className={ styles.result }>любовь к свободе...</div>
              </div>
              <div className={ styles.feature }>
                <div className={ styles.item }>ресурс</div>
                <div className={ styles.dots }></div>
                <div className={ styles.result }>отсутствие материальных привязок...</div>
              </div>
              <div className={ styles.feature }>
                <div className={ styles.item }>тень</div>
                <div className={ styles.dots }></div>
                <div className={ styles.result }>зацепка за старый мир и образ жизни...</div>
              </div>
            </div>
            <div className={ styles.title }>Характеристики</div>
            <div className={ styles.desc }>У каждого Аватара есть свои характерные черты, слабые и сильные стороны. Возможно вы отличный работник, внимательны к деталям и все выполняете в срок, но общение с людьми дается тяжело: не получается выражать свои чувства и люди несправедливо считают вас безэмоциональным и замкнутым. Узнав своих Аватаров, вы сможете сделать упор на сильные черты, понять как уменьшить вред от слабых и извлечь пользу даже из неприятных ситуаций.</div>
          </div>
          <img className={ styles.card } src={ '/images/icon/card-3svg.svg' } />
          <img className={ styles.char2 } src="/images/icon/char9.png" alt="Персонаж" />
          <div className={ `${styles.text_block} ${styles.text_block2}` }>
            <div className={ styles.disvg }>
              <img className={ styles.imgDisvg } src={ '/images/icon/disvg.svg' } />
              <div className={ styles.textDisvg }>//раскрой все свои стороны</div>
            </div>
            <div className={ styles.textAvatar }>
              Зная своих Аватаров вы найдете ответы на вопросы:
              <br />
              <br />
              Как лучше строить отношения с близкими? Какой выбрать университет? Что тормозит меня на пути к мечте? и тд. Узнавая себя, вы сможете лучше принимать решения, которые формируют жизнь изо дня в день. Еще один приятный бонус: пока все повально будут мечтать о белой яхте, вы достигнете того, что важно именно для вас.
            </div>
          </div>
        </div>
      </section>
      <section className={ styles.buttonLine }>
        <ButtonLine />
      </section>
    </div>
  );
};
