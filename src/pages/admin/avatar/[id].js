import { getAvatarsAdmin, setAll, setPreview } from "@@/utils/api";
import styles from '../admin.module.css';
import { useRouter } from "next/router";
import { personalities } from "@@/utils/personality";
import { useState } from "react";

export const Avatar = ({ date }) => {
  const [result, setResult] = useState(date);

  const sendPreview = async (id) => {
   const result = await setPreview({ id: id });
   setResult(result.date)
  };

  const sendAll = async(id) => {
    const result = await setAll({ id: id });
    setResult(result.date)
  };

  return (
    <section className={ styles.section }>
      <div className={ styles.body }>
        <div className={ styles.title }>Список пользователей</div>
        {
          result.map(avatar => {
            const avatarDate = personalities.find(pr => pr.id === avatar.avatar_id);
            console.log(avatarDate);
            return (
              <div className={ styles.item } key={ avatar.id } >
                <div className={ styles.name }>{ avatarDate.part.maleTitle }</div>
                {
                  avatar.preview ?
                    <div>у пользоватея есть просмотр</div>
                    : <div className={ styles.btn } onClick={ () => { sendPreview(avatar.id); } }>Дать просмотр</div>
                }
                {
                  avatar.purchased ? <div>Куплен</div>
                    :
                    <div className={ styles.btn } onClick={ () => { sendAll(avatar.id); } }>Дать полный доступ</div>

                }
              </div>
            );
          })
        }
      </div>
    </section>
  );
};

export default Avatar;

export async function getServerSideProps({ req, params }) {
  const cookies = req.headers?.cookie || '';
  const accessToken = cookies
    .split('; ')
    .find((row) => row.startsWith('accessToken='))
    ?.split('=')[1];

  const { id } = params;

  const result = await getAvatarsAdmin(accessToken, { id: id });
  const date = result.date;
  return {
    props: { date },
  };
}
