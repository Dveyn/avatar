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
    <section className={ styles.section }>

      { date.date.is_admin ? <div onClick={()=>{router.push('/admin/users')}} style={{marginBottom: '20px'}} className={ styles.addPerson }>Админ панель</div> : null }


      <div onClick={ () => { setOpen(true); } } className={ styles.addPerson }>Добавить человека</div>
      {
        date.people === 0 ? <People date={ date } /> :
          date.people === 1 ?
            <Avatars date={ date } /> :
            <People date={ date } />
      }

      { open && <ProfileCalculator onClose={ () => { setOpen(false); } } /> }
    </section>
  );
};
export default Profile;

export async function getServerSideProps({ req }) {
  const cookies = req.headers.cookie || '';
  console.log('All cookies:', cookies);

  const accessToken = cookies
    .split('; ')
    .find((row) => row.startsWith('accessToken='))
    ?.split('=')[1];
  console.log('Access token:', accessToken);

  if (!accessToken) {
    console.log('No access token found, redirecting to signin');
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    };
  }

  try {
    const response = await fetchProfile(accessToken);
    console.log('Profile response:', response);
    if (!response || response.is_error) {
      console.log('Profile response error, redirecting to signin');
      return {
        redirect: {
          destination: '/signin',
          permanent: false,
        },
      };
    }
    return {
      props: { date: response },
    };
  } catch (error) {
    console.error('Error fetching profile:', error);
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    };
  }
}
