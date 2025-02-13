
import { useState } from 'react';
import styles from './styles.module.css'; // Подключите ваш файл стилей

export const Advantages = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const items = [
    {
      img: '/images/icon/весы.png',
      title: 'Эмоциональной устойчивости и балансу',
      desc: 'Когда человек понимает свои эмоции, он лучше справляется с негативными ситуациями и сохраняет внутреннее равновесие. Знание теневых сторон позволяет не подавлять их, а конструктивно работать с ними.'
    },
    {
      img: '/images/icon/чаша.png',
      title: 'Развитию личных ресурсов',
      desc: 'Понимание своих сильных сторон помогает лучше использовать их для достижения целей. Человек становится более эффективным, так как знает, в каких областях он особенно силён и как лучше направить свою энергию.'
    },
    {
      img: '/images/icon/starts.png',
      title: 'Расширению возможностей',
      desc: 'Человек, осознающий свои ресурсы и ограничения, может более точно ставить цели и достигать их, находя оптимальные пути для реализации своего потенциала.'
    },
    {
      img: '/images/icon/key.png',
      title: 'Улучшению отношений',
      desc: 'Знание себя даёт возможность лучше понимать других людей, быть более эмпатичным, что улучшает как личные, так и профессиональные отношения.'
    },
    {
      img: '/images/icon/fire.png',
      title: 'Повышению уверенности',
      desc: 'Осознанность своих сильных и слабых сторон создаёт реалистичную самооценку. Это повышает уверенность в себе, так как человек опирается на реальные знания о своих возможностях и ресурсах.'
    },
    {
      img: '/images/icon/glass.png',
      title: 'Повышению осознанности',
      desc: 'Человек осознаёт, что движет его действиями, почему возникают те или иные реакции. Это помогает принимать более взвешенные решения и меньше поддаваться внешним раздражителям.'
    },
    {
      img: '/images/icon/rubin.png',
      title: 'Способности к самокоррекции',
      desc: 'Знание теневых проявлений позволяет осознавать, какие черты или паттерны поведения могут мешать успеху или счастью. Это помогает изменить их, работая над собой осознанно.'
    },
    {
      img: '/images/icon/draco.png',
      title: 'Освобождению от внутренних конфликтов',
      desc: 'Принятие своих теневых сторон помогает интегрировать их в общую картину личности, что снимает внутренние конфликты и освобождает энергию для созидания и роста.'
    }
  ];

  const handleNext = () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0)
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(items.length - 1);
    }
  };

  return (
    <div className={styles.advantagesMobile}>
      <div className={styles.item}>
        <div className={styles.item_img}>
          <img src={items[currentIndex].img} />
        </div>
        <div className={styles.item_title}>{items[currentIndex].title}</div>
        <div className={styles.item_desc}>{items[currentIndex].desc}</div>
      </div>

      <div className={styles.buttons}>
        <button onClick={handlePrev} className={styles.prevButton}>
        <svg viewBox="0 0 94 94" fill="none" xmlns="http://www.w3.org/2000/svg" ><path d="M39 68L60 47L39 26" stroke="black" vector-effect="non-scaling-stroke"></path></svg></button>
        <button onClick={handleNext} className={styles.nextButton}>
        <svg  viewBox="0 0 94 94" fill="none" xmlns="http://www.w3.org/2000/svg" ><path d="M39 68L60 47L39 26" stroke="black" vector-effect="non-scaling-stroke" ></path></svg></button>
      </div>
    </div>
  );
};

