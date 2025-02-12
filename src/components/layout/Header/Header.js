/* eslint-disable @next/next/no-html-link-for-pages */
import Link from 'next/link';
import { useState } from 'react'; // Импортируем useState
import styles from './header.module.css';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Состояние для управления видимостью меню

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Переключаем состояние меню
  };

  return (
    <header className={ styles.header }>
      <nav>
        {/* Иконка бургера для мобильной версии */ }
        <div className={ styles.burger } onClick={ toggleMenu }>
          <div className={ styles.burgerLine }></div>
          <div className={ styles.burgerLine }></div>
          <div className={ styles.burgerLine }></div>
        </div>

        {/* Меню */ }
        <ul className={ `${styles.menu} ${isMenuOpen ? styles.menuOpen : ''}` }>
          <Link className={ styles.left } href="/#avatary" onClick={ toggleMenu }>
            Кто такие аватары
          </Link>
          <Link className={ styles.left } href="/#advantages" onClick={ toggleMenu }>
            Преимущества метода
          </Link>
          <Link className={ styles.left } href="/#services" onClick={ toggleMenu }>
            Услуги
          </Link>
          <div className={ styles.spacer }></div>
          <a className={ styles.right } href="/#aboutmethod" onClick={ toggleMenu }>
            О методе
          </a>
          <a className={ styles.right } href="/#aboutme" onClick={ toggleMenu }>
            Об авторе
          </a>
          <a className={ styles.lk } href="/profile" onClick={ toggleMenu }>
            Личный кабинет
          </a>
        </ul>
      </nav>
    </header>
  );
};
