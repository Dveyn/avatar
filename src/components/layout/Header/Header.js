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
          <Link className={ styles.left } href="/#avatary" scroll={ false } onClick={ toggleMenu }>
            Кто такие аватары
          </Link>
          <Link className={ styles.left } href="/#advantages" scroll={ false } onClick={ toggleMenu }>
            Преимущества метода
          </Link>
          <Link className={ styles.left } href="/#services" scroll={ false } onClick={ toggleMenu }>
            Услуги
          </Link>
          <Link className={ styles.left } href="/#reviews" scroll={ false } onClick={ toggleMenu }>
            Отзывы
          </Link>
          <div className={ styles.spacer }></div>
          <Link className={ styles.right } href="/#aboutmethod" scroll={ false } onClick={ toggleMenu }>
            О методе
          </Link>
          <Link className={ styles.right } href="/#aboutme" scroll={ false } onClick={ toggleMenu }>
            Об авторе
          </Link>
          <a className={ styles.lk } href="/profile" scroll={ false } onClick={ toggleMenu }>
            Личный кабинет
          </a>
        </ul>
      </nav>
    </header>
  );
};
