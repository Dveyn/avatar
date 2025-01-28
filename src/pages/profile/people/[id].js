import { getUserAvatars } from '@@/utils/api';
import { Avatars } from '@@/components/layout';
import styles from './people.module.css'

const PeoplePage = ({ date }) => {
  return (
    <section className={ styles.section }>
      <Avatars date={ date } />
    </section>
  );
};

export default PeoplePage;

export async function getServerSideProps({ req, params }) {
  const cookies = req.headers.cookie || '';
  const accessToken = cookies
    .split('; ')
    .find((row) => row.startsWith('accessToken='))
    ?.split('=')[1];

  const { id } = params;


  const result = await getUserAvatars({ id: id }, accessToken);
  return {
    props: { date: result },
  };

}
