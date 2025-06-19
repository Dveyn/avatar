import { fetchProfile } from '@@/utils/api';
import styles from './profile.module.css';
import { Avatars, People } from '@@/components/layout';

import dynamic from 'next/dynamic';
import { useReducer, useState } from 'react';
import { useRouter } from 'next/router';
const ProfileCalculator = dynamic(() => import('@@/components/layout/Profile/ProfileCalculator/ProfileCalculator'), { ssr: false });


const Profile = ({ date }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Header с информацией о пользователе */}
        <div className={styles.profileHeader}>
          <div className={styles.welcomeSection}>
            <h1 className={styles.welcomeTitle}>
              Добро пожаловать, {date.date?.name || 'Пользователь'}!
            </h1>
            <p className={styles.welcomeSubtitle}>
              Исследуйте свои аватары и раскройте свой потенциал
            </p>
          </div>
          
          {/* Админ панель */}
          {date.date?.is_admin ? (
            <div 
              onClick={() => router.push('/admin/users')} 
              className={styles.adminButton}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
              Админ панель
            </div>
          ) : null}
        </div>

        {/* Основные действия */}
        <div className={styles.actionsSection}>
          <div 
            onClick={() => setOpen(true)} 
            className={styles.addPersonButton}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="m22 21-2-2"/>
              <path d="m16 16 4 4 4-4"/>
            </svg>
            Добавить человека
          </div>
        </div>

        {/* Контент */}
        <div className={styles.contentSection}>
          {date.people === 0 ? (
            <People date={date} />
          ) : date.people === 1 ? (
            <Avatars date={date} />
          ) : (
            <People date={date} />
          )}
        </div>
      </div>

      {open && <ProfileCalculator onClose={() => setOpen(false)} />}
    </section>
  );
};

export default Profile;

export async function getServerSideProps({ req }) {
  const cookies = req.headers.cookie || '';

  const accessToken = cookies
    .split('; ')
    .find((row) => row.startsWith('accessToken='))
    ?.split('=')[1];

  const response = await fetchProfile(accessToken);
  const date = response || { is_error: true };

  return {
    props: { date },
  };
}
