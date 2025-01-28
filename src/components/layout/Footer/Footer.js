import styles from './Footer.module.css';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerImg}>
        <div className={styles.logo}>
          <img src={'/images/icon/AvaLik_logo.png'} />
         <div className={styles.copy}> © {new Date().getFullYear()}. Все права защищены</div>
        </div>
        <div className={styles.menu}>
          <div className={styles.title}>//МЕНЮ</div>
          <div className={styles.item}>{'{Кто такие аватары}'}</div>
          <div className={styles.item}>{'{О методе}'}</div>
          <div className={styles.item}>{'{Преимущества метода}'}</div>
          <div className={styles.item}>{'{Калькулятор Аватаров}'}</div>
        </div>
        <div className={styles.menu}>
        <div className={styles.title}>//КОНТАКТЫ</div>
          <div className={styles.item}>ИП КИМ СВЕТЛАНА ЛЮБОМИРОВНА</div>
          <div className={styles.item}>ИНН 233907471925</div>
          <div className={styles.item}>ОГРНИП: 319237500383296</div>
        </div>
        <div className={styles.menu}>
        <div className={styles.title}>//ДОКУМЕНТЫ</div>
          <div className={styles.item}>Политика конфидициальности</div>
          <div className={styles.item}>Договор оферта</div>
          <div className={styles.item}>Пользовательское соглашение</div>
        </div>
        <div className={styles.imgBlock}>
          <img src='/images/icon/Frame_50.svg' />
        </div>
      </div>
    </footer>
  )
}
