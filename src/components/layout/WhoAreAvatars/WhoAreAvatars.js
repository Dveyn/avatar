import { Form } from '@@/components/ui';
import styles from './WhoAreAvatars.module.css';
import { useEffect } from 'react';

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

  return (
    <div className={ styles.box }>
      <section className={ styles.section } id='avatary'>
        <div className={ styles.blur }></div>
        <h2 className={ styles.title }>Кто такие Аватары?</h2>
        <div className={ styles.pretitle }>это твое альтер эго, твой друг.</div>
        <Form className={ `${styles.form} ${styles.form1}` }>
          <p>
            Как в игре, когда у Героя есть доступ к ресурсам и скиллам, артефактам и пр.,
            у тебя есть круглосуточный доступ к твоим Аватарам и они каждый со своими сильными и
            слабыми сторонами, плюсами и минусами, ресурсной и теневой сторонами.
            <br />
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
            Если ты будешь знать какие именно у тебя Аватары, их характеристики,
            ты сможешь использовать их для достижения своих целей, использовать их ресурсы!
          </p>
        </Form>
      </section>

    </div>

  );
};
