import { getUsersAdmin } from "@@/utils/api";
import styles from '../admin.module.css';
import { useRouter } from "next/router";

export const Users = ({ date }) => {
  
  const router = useRouter();
  
  return (
    <section className={ styles.section }>
      <div className={ styles.body }>
        <div className={ styles.title }>Список пользователей</div>
        {
          date.map(user => {
            return (
              <div className={ styles.item } key={ user.id } onClick={()=>{router.push(`/admin/users/${user.id}`)}}>
                <div className={ styles.name }>{ user.email }</div>
              </div>
            );
          })
        }
      </div>
    </section>
  );
};

export default Users;

export async function getServerSideProps({ req, params }) {
  const cookies = req.headers?.cookie || '';
  const accessToken = cookies
    .split('; ')
    .find((row) => row.startsWith('accessToken='))
    ?.split('=')[1];


  const result = await getUsersAdmin(accessToken);
  const date = result.date;
  return {
    props: { date },
  };
}
