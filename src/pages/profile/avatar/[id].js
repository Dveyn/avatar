import { getUserAvatar } from '@@/utils/api';
import styles from './avatar.module.css';
import { personalities } from '@@/utils/personality';
import { useState } from 'react';
import { generateCharacterBlock } from '@@/utils/pdfGenerator';
import { Button } from '@@/components/ui';

const AvatarPage = ({ avatar }) => {
  const [openSection, setOpenSection] = useState(null);

  const handleDownload = async () => {
    const pdfBytes = await generateCharacterBlock(avatar);
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'beautiful-pdf-with-svg.pdf';
    link.click();
  };


  // Структура секций
  const sections = [
    { title: 'Ресурсы', content: avatar.resources, key: 'resources' },
    { title: 'Тень', content: avatar.shadow, key: 'shadow' },
    { title: 'Проявления в действиях в ресурсе', content: avatar.manifestationsInActions, key: 'manifestationsInActions' },
    { title: 'Проявления в действиях тени', content: avatar.manifestationsInShadowActions, key: 'manifestationsInShadowActions' },
    { title: 'Рекомендации', content: avatar.recommendations, key: 'recommendations' },
  ];

  // Функция для переключения секции
  const toggleSection = (key) => {
    setOpenSection((prev) => (prev === key ? null : key)); // Закрываем, если та же секция, иначе открываем новую
  };

  return (
    <div className={ styles.body }>
      <section className={ styles.section }>
        <div className={ styles.info }>
          <div className={ `${styles.text_block} ${styles.text_block1}` }>
            <div className={ styles.dialog }>
              <span className={ styles.text1 }>{ avatar.name }</span>
            </div>
            <div className={ styles.title }>Ресурс</div>
            <ul className={ styles.feature_block }>
              {
                avatar.resources.slice(0, 5).map((resourse, index) => {
                  return (
                    <li key={ index } className={ styles.feature }>
                      { resourse }
                    </li>
                  );
                })
              }
            </ul>
            <div className={ styles.title }>Тень</div>
            <ul className={ styles.feature_block }>
              {
                avatar.shadow.slice(0, 5).map((shadow, index) => {
                  return (
                    <li key={ index } className={ styles.feature }>
                      { shadow }
                    </li>
                  );
                })
              }
            </ul>
          </div>
          <div className={ styles.charBox }>
            <img className={ styles.char2 } src={ avatar.imgProfile } alt="Персонаж" />
          </div>
          <div className={ `${styles.text_block} ${styles.text_block2}` }>
            <div className={ styles.title }>характер персонажа</div>
            <div className={ styles.textAvatar }>
              { avatar.desc }
            </div>
          </div>
        </div>
      </section>

      <section className={ styles.section2 }>
        <div className={ styles.img_box }>
          <img src={ avatar.img } alt="Avatar" />
        </div>
        <div className={ styles.info_box }>
          { sections.map(({ title, content, key }) => (
            <div key={ key } className={ `${styles.accordion} ${openSection === key ? styles.open : ''}` }>
              <button
                className={ styles.accordion_button }
                onClick={ () => toggleSection(key) }
              >
                { title }
              </button>
              <ul className={ styles.accordion_list }>
                { content ? content?.map((item, index) => (
                  <li key={ index } className={ styles.accordion_item }>
                    { item }
                  </li>
                )) :
                  avatar.purchased == 0 && <>После покупки первого аватара, вам станет доступна вся информация</>
                }
              </ul>
            </div>
          )) }
        </div>

      </section>
      <Button className={ styles.btn_save } onClick={ handleDownload }> Скачать PDF</Button>

    </div>
  );
};

export default AvatarPage;
export async function getServerSideProps({ req, params }) {
  const cookies = req.headers.cookie || '';
  const accessToken = cookies
    .split('; ')
    .find((row) => row.startsWith('accessToken='))
    ?.split('=')[1];

  const { id } = params;


  const result = await getUserAvatar({ id: id }, accessToken);
  const avatarPer = personalities.find(pr => pr.id === result.avatar.avatar_id);
  const gender = result.avatar.gender;

  const avatar = {
    img: avatarPer.part[`${gender === 'male' ? 'maleImageSrc' : 'femaleImageSrc'}`],
    imgProfile: avatarPer.part[`${gender === 'male' ? 'maleImageSrc' : 'femaleImageSrc'}`]
      .replace('/images/avatar/', '/images/avatarProfile/'),
    name: avatarPer.part[`${gender === 'male' ? 'maleTitle' : 'femaleTitle'}`],
    desc: avatarPer.part[`${gender === 'male' ? 'maleDescription' : 'femaleDescription'}`],
    resources: avatarPer.resources[`${gender === 'male' ? 'maleResources' : 'femaleResources'}`],
    shadow: avatarPer.shadow[`${gender === 'male' ? 'maleShadow' : 'femaleShadow'}`],
    purchased: result.avatar.purchased,
  };

  if (result.avatar.purchased) {
    avatar.recommendations = avatarPer.recommendations[`${gender === 'male' ? 'maleRecommendations' : 'femaleRecommendations'}`];
    avatar.manifestationsInActions = avatarPer.manifestationsInActions[`${gender === 'male' ? 'maleManifestationsInActions' : 'femaleManifestationsInActions'}`];
    avatar.manifestationsInShadowActions = avatarPer.manifestationsInShadowActions[`${gender === 'male' ? 'maleManifestationsInShadowActions' : 'femaleManifestationsInShadowActions'}`];
  }
  return {
    props: { avatar },
  };

}
