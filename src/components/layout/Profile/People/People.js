import { Button } from '@@/components/ui';
import styles from './People.module.css';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const ProfileCalculator = dynamic(() => import('../ProfileCalculator/ProfileCalculator'), { ssr: false });

export const People = ({ date }) => {
  const routing = useRouter();
  const [open, setOpen] = useState(false);

  if (date.people === 0) {
    return (
      <div className={styles.body}>
        <div className={styles.noPeopleContainer}>
          <div className={styles.noPeopleContent}>
            <div className={styles.noPeopleIcon}>
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="m22 21-2-2"/>
                <path d="m16 16 4 4 4-4"/>
              </svg>
            </div>
            <h2 className={styles.noPeopleTitle}>
              Пока нет добавленных людей
            </h2>
            <p className={styles.noPeopleDescription}>
              Добавьте первого человека, чтобы начать исследование аватаров
            </p>
            <Button 
              onClick={() => setOpen(true)} 
              className={styles.addButton}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12h14"/>
              </svg>
              Добавить первого человека
            </Button>
          </div>
        </div>
        {open && <ProfileCalculator onClose={() => setOpen(false)} />}
      </div>
    );
  }

  return (
    <div className={styles.body}>
      <div className={styles.peopleHeader}>
        <h2 className={styles.peopleTitle}>
          Ваши люди ({date.people.length})
        </h2>
        <p className={styles.peopleSubtitle}>
          Выберите человека для просмотра его аватаров
        </p>
      </div>
      
      <div className={styles.peopleGrid}>
        {date.people.map((item, index) => (
          <div 
            key={item.id} 
            className={styles.personCard}
            onClick={() => routing.push(`/profile/people/${item.id}`)}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className={styles.personCardContent}>
              <div className={styles.personAvatar}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                </svg>
              </div>
              <h3 className={styles.personName}>{item.name}</h3>
              <div className={styles.personAction}>
                <span>Просмотреть аватары</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m9 18 6-6-6-6"/>
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
