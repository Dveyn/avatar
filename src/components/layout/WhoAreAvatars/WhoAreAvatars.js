import { Button, Form } from '@@/components/ui';
import styles from './WhoAreAvatars.module.css';
import { useEffect, useState } from 'react';
import { ModalCalc } from '../Modal/ModalCalculator';

export const WhoAreAvatars = () => {

  useEffect(() => {
    let gsap;
    let ScrollTrigger;

    const initAnimations = async () => {
      // eslint-disable-next-line @next/next/no-assign-module-variable
      const module = await import('gsap');
      gsap = module.gsap;
      ScrollTrigger = (await import('gsap/ScrollTrigger')).ScrollTrigger;

      gsap.registerPlugin(ScrollTrigger);
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: `.${styles.box}`,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        },
      });

      timeline.fromTo(
        `.${styles.sword}`,
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
      );
    };

    initAnimations();

  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);


  return (
    <div className={ styles.box }>
      <section className={ styles.section } id='avatary'>
        <div className={ styles.blur }></div>
        <h2 className={ styles.title }>Кто такие Аватары?</h2>
        <Form className={ `${styles.form} ${styles.form1}` }>
          <p>
            Аватары — это разные части вашей личности, которые могут проявляться в разных ситуациях.
            <br />
            <br />
            Представьте, что у вас внутри есть несколько "я", и каждое из них отвечает за свои чувства, мысли и поведение.
            <br />
            <span style={ { fontWeight: 600 } }>
              И скажу тебе, что в тебе не один Аватар, а больше 10-ти!
            </span>
          </p>

        </Form>

        <img className={ styles.mage_circle } src={ '/images/icon/mage_circle.svg' } />
        <img className={ styles.sword } src={ '/images/icon/sword.png' } />

      </section>
      <section className={ styles.section2 }>
        <Form className={ `${styles.form} ${styles.form2}` }>
          <p>
            Аватары помогают нам понимать, почему мы ведем себя так или иначе в разных ситуациях. Они дают возможность лучше разобраться в себе и своих эмоциях.        </p>
          <br />
          <br />
          С помощью аватаров вы можете увидеть, почему проседаете в бизнесе, каким вообще делом заниматься?  Каких людей выбирать в партнеры, а каких избегать?
          <Button onClick={ openModal }>Узнать своего аватара</Button>
        </Form>
      </section>
      { isModalOpen && <ModalCalc onClose={ closeModal } /> }
    </div>

  );
};
