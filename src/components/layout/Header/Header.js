/* eslint-disable @next/next/no-html-link-for-pages */
import Link from 'next/link';
import styles from './header.module.css';

export const Header = () => {
  return (
    <header className={ styles.header }>
      <nav>
        <ul className={ styles.menu }>

          <Link className={ styles.left } href="/#avatary">
            Кто такие аватары
          </Link>
          <Link className={ styles.left } href="/#advantages">
            Преимущества метода
          </Link>
          <div className={ styles.spacer }></div> {/* Промежуток между группами */ }
          <a className={ styles.right } href="/#aboutmethod">
            О методе
          </a>
          <a className={ styles.right } href="/#aboutme">
            Обо мне
          </a>
          <a className={ styles.lk } href="/profile">
            Личный кабинет
          </a>
        </ul>
      </nav>
    </header>
  );
};
