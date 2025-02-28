/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { personalities } from '@@/utils/personality';
import styles from './Avatars.module.css';
import { Button } from '@@/components/ui';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { AskModal } from '../../Modal/AskModal';
import { PayModal } from '../../Modal/PayModal';

export const Avatars = ({ date }) => {

  const router = useRouter();

  const [openAsk, setOpenAsk] = useState(false);
  const [ask, setAsk] = useState(null);
  const [openPay, setOpenPay] = useState(false);

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(0);
  const [avatarId, setAvatarId] = useState();

  const clickAvatar = (avatar) => {
    if (avatar.purchased || avatar.preview) {
      router.push({
        pathname: `/profile/avatar/${avatar.id}`,
        query: { date: JSON.stringify(date.date.gender) },
      }, undefined, { shallow: true });
    }
  };

  const avatarFree = date.avatars.filter(av => av.keyWord == 'A');
  const avatarResourse = date.avatars.filter(av => av.keyWord == 'B' || av.keyWord == 'B2' );
  const avatarEssence = date.avatars.filter(av => av.keyWord == 'D');
  const avatarFinance = date.avatars.filter(av => av.keyWord == 'V' || av.keyWord == 'G' || av.keyWord == 'L');
  const avatarComm = date.avatars.filter(av => av.keyWord == 'K' || av.keyWord == 'N' || av.keyWord == 'M');

  console.log(date);

  return (
    <div className={ styles.body }>
      <div className={ styles.header }>
        <div className={ styles.title }>Аватары</div>
        <div className={ styles.user_info }>
          { date.date.name }
        </div>
        <div className={ styles.title }>Эти аватары показывают твой характер</div>
        <div className={ styles.avatar_list }>
          {
            avatarFree.map(avatar => {
              const avatarDate = personalities.find(el => el.id === avatar.avatar_id);
              return (
                <>
                  <div key={ avatar.id } className={ styles.avatar_card }>
                    <img
                      src={ avatarDate.part[`${date.date.gender === 'male' ? 'maleImageSrc' : 'femaleImageSrc'}`] }
                      onClick={ () => { clickAvatar(avatar); } }
                    />
                    {
                      avatar.preview === 1 || avatar.purchased === 1 ?
                        <Button
                          className={ styles.btn }
                          onClick={ () => {
                            setOpenAsk(true);
                            setAsk(date.date.gender === 'male' ? avatarDate.questions.maleQuestions : avatarDate.questions.femaleQuestions);
                          } }
                        >Пройти вопросы</Button>
                        : 
                        <Button 
                          className={ styles.btn } 
                          onClick={ () => { 
                            setOpenPay(true); 
                            setTitle(`Покупка Аватара ${date.date.gender === 'male' ? avatarDate.part.maleTitle : avatarDate.part.femaleTitle}`);
                            setAvatarId(avatarDate.id);
                            setPrice(2000);
                            } }
                          >Купить</Button>
                    }
                  </div>
                </>
              );
            })
          }
        </div>
        <div>
          <div className={ styles.title }>Эти аватары показывают твои ресурсы и таланты</div>
          <div className={ styles.avatar_list }>
            {
              avatarResourse.map(avatar => {
                const avatarDate = personalities.find(el => el.id === avatar.avatar_id);
                return (
                  <>
                    <div key={ avatar.id } className={ styles.avatar_card }>
                      <img
                        src={ avatarDate.part[`${date.date.gender === 'male' ? 'maleImageSrc' : 'femaleImageSrc'}`] }
                        onClick={ () => { clickAvatar(avatar); } }
                      />
                      {
                        avatar.preview === 1 || avatar.purchased === 1 ?
                          <Button
                            className={ styles.btn }
                            onClick={ () => {
                              setOpenAsk(true);
                              setAsk(date.date.gender === 'male' ? avatarDate.questions.maleQuestions : avatarDate.questions.femaleQuestions);
                            } }
                          >Пройти вопросы</Button>
                          : 
                          <Button 
                          className={ styles.btn } 
                          onClick={ () => { 
                            setOpenPay(true); 
                            setTitle(`Покупка Аватара ${date.date.gender === 'male' ? avatarDate.part.maleTitle : avatarDate.part.femaleTitle}`);
                            setAvatarId(avatarDate.id);
                            setPrice(2000);
                            } }
                          >Купить</Button>
                      }
                    </div>
                  </>
                );
              })
            }
          </div>
        </div>
        <div>
          <div className={ styles.title }>Эти аватары показывают твою внутреннюю суть</div>
          <div className={ styles.avatar_list }>
            {
              avatarEssence.map(avatar => {
                const avatarDate = personalities.find(el => el.id === avatar.avatar_id);
                return (
                  <>
                    <div key={ avatar.id } className={ styles.avatar_card }>
                      <img
                        src={ avatarDate.part[`${date.date.gender === 'male' ? 'maleImageSrc' : 'femaleImageSrc'}`] }
                        onClick={ () => { clickAvatar(avatar); } }
                      />
                      {
                        avatar.preview === 1 || avatar.purchased === 1 ?
                          <Button
                            className={ styles.btn }
                            onClick={ () => {
                              setOpenAsk(true);
                              setAsk(date.date.gender === 'male' ? avatarDate.questions.maleQuestions : avatarDate.questions.femaleQuestions);
                            } }
                          >Пройти вопросы</Button>
                          : 
                          <Button 
                          className={ styles.btn } 
                          onClick={ () => { 
                            setOpenPay(true); 
                            setTitle(`Покупка Аватара ${date.date.gender === 'male' ? avatarDate.part.maleTitle : avatarDate.part.femaleTitle}`);
                            setAvatarId(avatarDate.id);
                            setPrice(2000);
                            } }
                          >Купить</Button>
                      }
                    </div>
                  </>
                );
              })
            }
          </div>
        </div>
        <div>
          <div className={ styles.title }>Эти аватары отвечают за твои Финансы</div>
          <div className={ styles.avatar_list }>
            {
              avatarFinance.map(avatar => {
                const avatarDate = personalities.find(el => el.id === avatar.avatar_id);
                return (
                  <>
                    <div key={ avatar.id } className={ styles.avatar_card }>
                      <img
                        src={ avatarDate.part[`${date.date.gender === 'male' ? 'maleImageSrc' : 'femaleImageSrc'}`] }
                        onClick={ () => { clickAvatar(avatar); } }
                      />
                      {
                        avatar.preview === 1 || avatar.purchased === 1 ?
                          <Button
                            className={ styles.btn }
                            onClick={ () => {
                              setOpenAsk(true);
                              setAsk(date.date.gender === 'male' ? avatarDate.questions.maleQuestions : avatarDate.questions.femaleQuestions);
                            } }
                          >Пройти вопросы</Button>
                          : 
                          <Button 
                          className={ styles.btn } 
                          onClick={ () => { 
                            setOpenPay(true); 
                            setTitle(`Покупка Аватара ${date.date.gender === 'male' ? avatarDate.part.maleTitle : avatarDate.part.femaleTitle}`);
                            setAvatarId(avatarDate.id);
                            setPrice(2000);
                            } }
                          >Купить</Button>
                      }
                    </div>
                  </>
                );
              })
            }
          </div>
        </div>
        <div>
          <div className={ styles.title }>Эти аватары отвечают за твои Отношения</div>
          <div className={ styles.avatar_list }>
            {
              avatarComm.map(avatar => {
                const avatarDate = personalities.find(el => el.id === avatar.avatar_id);

                return (
                  <>
                    <div key={ avatar.id } className={ styles.avatar_card }>
                      <img
                        src={ avatarDate.part[`${date.date.gender === 'male' ? 'maleImageSrc' : 'femaleImageSrc'}`] }
                        onClick={ () => { clickAvatar(avatar); } }
                      />
                      {
                        avatar.preview === 1 || avatar.purchased === 1 ?
                          <Button
                            className={ styles.btn }
                            onClick={ () => {
                              setOpenAsk(true);
                              setAsk(date.date.gender === 'male' ? avatarDate.questions.maleQuestions : avatarDate.questions.femaleQuestions);
                            } }
                          >Пройти вопросы</Button> :
                          <Button 
                          className={ styles.btn } 
                          onClick={ () => { 
                            setOpenPay(true); 
                            setAvatarId(avatarDate.id);
                            setTitle(`Покупка Аватара ${date.date.gender === 'male' ? avatarDate.part.maleTitle : avatarDate.part.femaleTitle}`);
                            setPrice(2000);
                            } }
                          >Купить</Button>
                      }
                    </div>
                  </>
                );
              })
            }
          </div>
        </div>
      </div>
      { openAsk && <AskModal onClose={ () => { setOpenAsk(false); } } ask={ ask } /> }
      { openPay &&
        <PayModal onClose={ () => { setOpenPay(false); } }
          emailUser={ date.date.email }
          piopleId={ date.date.id }
          avatarId={avatarId}
          title={ title }
          price={ price }
        /> }
    </div>
  );
};
