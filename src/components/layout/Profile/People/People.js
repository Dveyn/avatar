import { Button } from '@@/components/ui';
import styles from './People.module.css';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const ProfileCalculator = dynamic(() => import('../ProfileCalculator/ProfileCalculator'), { ssr: false });


export const People = ({ date }) => {
  const routing = useRouter();
  const [open, setOpen] = useState(false)


  if (date.people === 0) {
    return (
      <div className={ styles.body }>
        <div className={ styles.no_people }>
          <div className={styles.title}>Еще не добавленно ни одного человека.</div>
          <Button onClick={()=>{setOpen(true)}} className={styles.btn}>Добавить</Button>
        </div>
        { open && <ProfileCalculator onClose={()=>{setOpen(false)}} />}
      </div>
    );
  }
  return (
    <div className={ styles.body }>
      {
        date.people.map(item => {
          return(
            <div onClick={()=>{routing.push(`/profile/people/${item.id}`)}} key={item.id} className={styles.item}>
              <div className={styles.title}>{item.name}</div>
            </div>
          )
        })
      }
    </div>
  );
};
