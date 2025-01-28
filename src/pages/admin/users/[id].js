import { getPeoplesAdmin, getUsersAdmin } from "@@/utils/api";
import styles from '../admin.module.css';
import { useRouter } from "next/router";

export const User = ({ date }) => {
  console.log(date)
  const router = useRouter();

  return (
    <section className={ styles.section }>
      <div className={ styles.body }>
        <div className={ styles.title }>Список пользователей</div>
        {
          date.map(people => {
            return (
              <div className={ styles.item } key={ people.id } onClick={ () => { router.push(`/admin/avatar/${people.id}`); } }>
                <div className={ styles.name }>{ people.name }</div>
              </div>
            );
          })
        }
      </div>
    </section>
  );
};

export default User;

export async function getServerSideProps({ req, params }) {
  const cookies = req.headers?.cookie || '';
  const accessToken = cookies
    .split('; ')
    .find((row) => row.startsWith('accessToken='))
    ?.split('=')[1];

  const { id } = params;

  const result = await getPeoplesAdmin(accessToken, {id: id});
  const date = result.date;
  return {
    props: { date },
  };
}
