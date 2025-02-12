import { useEffect, useState } from 'react';
import { Button, ButtonLine, Form } from '@@/components/ui';
import styles from './AvatarQuiz.module.css';
import { ModalCalc } from '../Modal/ModalCalculator';

export const AvatarQuiz = () => {
  useEffect(() => {
    let gsap;
    let ScrollTrigger;

    const initAnimations = async () => {
      // Импортируем GSAP и ScrollTrigger только на клиенте
      const module = await import('gsap');
      gsap = module.gsap;
      ScrollTrigger = (await import('gsap/ScrollTrigger')).ScrollTrigger;

      gsap.registerPlugin(ScrollTrigger);
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: `.${styles.section}`,
          start: 'top center',
          end: 'bottom bottom',
          scrub: true,
        },
      });

      timeline.fromTo(
        `.${styles.text}`,
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
      );

      timeline.fromTo(
        `.${styles.char}`,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
        '<'
      );


      gsap.to(`.${styles.section}`, {
        backgroundSize: '140% 140%',
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: `.${styles.section}`,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    };

    initAnimations();

  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <section className={ styles.section }>
      <div className={ styles.top }></div>
      <Form className={ styles.form }>
        <div className={ styles.text }>
          На самом деле знать — не значит осознавать и управлять этим!
          <br />
          <br />
          Чтобы осознавать и управлять познакомься с собой, со своими Аватарами.
          <br />
          <Button onClick={openModal}>Познать себя</Button>
        </div>
        <div className={ styles.char }>
          <img className={ styles.img } src='/images/icon/char4.png' />
        </div>
      </Form>
        { isModalOpen && <ModalCalc onClose={ closeModal } /> }
    </section>
  );
};
