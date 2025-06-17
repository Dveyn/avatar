/* eslint-disable @next/next/no-html-link-for-pages */
import { useRouter } from 'next/router';
import styles from './Footer.module.css';
import { ModalCalc } from '../Modal/ModalCalculator';
import { useState } from 'react';

export const Footer = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <footer className={ styles.footer }>
      <div className={ styles.footerImg }>
        <div className={ styles.logo }>
          <img src={ '/images/icon/AvaLik_logo.png' } />
          <div className={ styles.copy }> © { new Date().getFullYear() }. Все права защищены</div>
        </div>
        <div className={ styles.menu }>
          <div className={ styles.title }>//МЕНЮ</div>
          <a className={ styles.item } href="/#avatary">{ '{Кто такие аватары}' }</a>
          <a className={ styles.item } href="/#aboutmethod">{ '{О методе}' }</a>
          <a className={ styles.item } href="/#advantages">{ '{Преимущества метода}' }</a>
          <a className={ styles.item } href="/#reviews">{ '{Отзывы}' }</a>
          <div className={ styles.item } onClick={openModal}>{ '{Расчитать своих аватаров}' }</div>
          { isModalOpen && <ModalCalc onClose={ closeModal } /> }
        </div>
        <div className={ styles.menu }>
          <div className={ styles.title }>//КОНТАКТЫ</div>
          <div className={ styles.item }>ИП КИМ СВЕТЛАНА ЛЮБОМИРОВНА</div>
          <div className={ styles.item }>ИНН 233907471925</div>
          <div className={ styles.item }>ОГРНИП: 319237500383296</div>
          <div className={ styles.item }>E-mail для обращений: <a href='mailto:info@avalik-avatar.ru' >info@avalik-avatar.ru</a></div>
          <div className={ `${styles.item} ${styles.inst_pc}` }><img src={ '/images/icon/qr.png' } /></div>
          <div className={ `${styles.item} ${styles.inst_mob}` }>
            <a href='https://www.instagram.com/kimsveta_coach?igsh=MW5wM2diNWFhajRubA%3D%3D&utm_source=qr' target='_blank'>
              <img src={ '/images/icon/instagram.png' } />
            </a>
          </div>
        </div>
        <div className={ styles.menu }>
          <div className={ styles.title }>//ДОКУМЕНТЫ</div>
          <a className={ styles.item } href='/privacy_policy'>Политика конфидициальности</a>
          <a className={ styles.item } href='/offer_page'>Договор оферта</a>
          <a className={ styles.item } href='/terms'>Пользовательское соглашение</a>
        </div>
        <div className={ styles.imgBlock }>
          <img src='/images/icon/Frame_50.svg' />
        </div>
      </div>
    </footer>
  );
};
