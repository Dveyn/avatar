/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { personalities } from '@@/utils/personality';
import styles from './Avatars.module.css';
import { Button } from '@@/components/ui';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { AskModal } from '../../Modal/AskModal';
import { PayModal } from '../../Modal/PayModal';
import { CustomModal } from '../../Modal/CustomModal';
import Accordion from '@@/components/ui/Accordion/Accordion';

export const Avatars = ({ date }) => {

  const router = useRouter();

  const [openPay, setOpenPay] = useState(false);
  const [openAction, setOpenAction] = useState(false);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(0);
  const [avatarId, setAvatarId] = useState();

  const handleBuyAll = (avatars) => {
    const notPurchasedAvatars = avatars.filter(av => !av.purchased);
    if (notPurchasedAvatars.length === 0) return;
    console.log(avatars, notPurchasedAvatars)
    const discount =  1;
    const totalPrice = notPurchasedAvatars.length * 2000 * discount;

    setOpenPay(true);
    setTitle(`Покупка всех аватаров (${notPurchasedAvatars.length} шт.)`);
    setAvatarId(notPurchasedAvatars.map(av => av.avatar_id));
    setPrice(totalPrice);
  };

  const clickAvatar = (avatar) => {
    if (avatar.purchased || avatar.preview) {
      router.push({
        pathname: `/profile/avatar/${avatar.id}`,
        query: { date: JSON.stringify(date.date.gender) },
      }, undefined, { shallow: true });
    }
  };

  const avatarFree = date.avatars.filter(av => av.keyWord == 'A');
  const avatarResourse = date.avatars.filter(av => av.keyWord == 'B' || av.keyWord == 'B2');
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
        <div className={ styles.title_av }>Эти аватары показывают твой характер</div>
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

                        <Button className={ styles.btn } onClick={ () => { clickAvatar(avatar); } }> Узнать подробнее </Button>
                        :
                        <Button
                          className={ styles.btn }
                          onClick={ () => {
                            setOpenPay(true);
                            setTitle(`Покупка Аватара ${date.date.gender === 'male' ? avatarDate.part.maleTitle : avatarDate.part.femaleTitle}`);
                            setAvatarId(avatarDate.id);
                            setPrice(2000);
                          } }
                        >Раскрыть аватара</Button>
                    }
                  </div>
                </>
              );
            })
          }
        </div>
        <div>
          <Accordion className={ styles.title_av } title="Эти аватары показывают твои ресурсы и таланты">
            <p>Эти Аватары показывают ваши ресурсы и таланты. Помогут вам увидеть в какой сфере вам легче реализоваться и что поможет вам реализовать ваш потенциал. </p>
          </Accordion>
          {avatarResourse.filter(av => !av.purchased && !av.preview).length >= 2 && (
            <Button className={styles.btn_all} onClick={() => handleBuyAll(avatarResourse)}>
              Купить всех {avatarResourse.filter(av => !av.purchased && !av.preview).length} шт. 
              {avatarResourse.filter(av => !av.purchased && !av.preview).length >= 2? <span className='discount'>Скидка 50%</span> : ''}
            </Button>
          )}
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
                          <Button className={ styles.btn } onClick={ () => { clickAvatar(avatar); } }> Узнать подробнее </Button>

                          :
                          <Button
                            className={ styles.btn }
                            onClick={ () => {
                              setOpenPay(true);
                              setTitle(`Покупка Аватара ${date.date.gender === 'male' ? avatarDate.part.maleTitle : avatarDate.part.femaleTitle}`);
                              setAvatarId(avatarDate.id);
                              setPrice(2000);
                            } }
                          >Раскрыть аватара</Button>
                      }
                    </div>
                  </>
                );
              })
            }
          </div>
        </div>
        <div>
          <Accordion className={ styles.title_av } title="Эти аватары показывают твою внутреннюю суть">
            <p>Поможет  узнать как вам быть в ресурсе, гармонии с собой и  что поможет  найти дело жизни?             .</p>
          </Accordion>
          {avatarEssence.filter(av => !av.purchased && !av.preview).length >= 2 && (
            <Button className={styles.btn_all} onClick={() => handleBuyAll(avatarEssence)}>
              Купить всех {avatarEssence.filter(av => !av.purchased && !av.preview).length} шт. 
              {avatarEssence.filter(av => !av.purchased && !av.preview).length >= 2? <span className='discount'>Скидка 50%</span> : ''}
            </Button>
          )}
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
                          <Button className={ styles.btn } onClick={ () => { clickAvatar(avatar); } }> Узнать подробнее </Button>

                          :
                          <Button
                            className={ styles.btn }
                            onClick={ () => {
                              setOpenPay(true);
                              setTitle(`Покупка Аватара ${date.date.gender === 'male' ? avatarDate.part.maleTitle : avatarDate.part.femaleTitle}`);
                              setAvatarId(avatarDate.id);
                              setPrice(2000);
                            } }
                          >Раскрыть аватара</Button>
                      }
                    </div>
                  </>
                );
              })
            }
          </div>
        </div>
        <div>
          <Accordion className={ styles.title_av } title="Эти аватары отвечают за твои Финансы">
            <p>Эти три Аватара отвечают за ваши Финансы. Зная их вы сможете определить в какой сфере вам легче зарабатывать деньги, как расшить  финансовый поток и чего стоит избегать чтобы не сливать свою энергию.</p>
          </Accordion>
          {avatarFinance.filter(av => !av.purchased && !av.preview).length >= 2 && (
            <Button className={styles.btn_all} onClick={() => handleBuyAll(avatarFinance)}>
              Купить всех {avatarFinance.filter(av => !av.purchased && !av.preview).length} шт. 
              {avatarFinance.filter(av => !av.purchased && !av.preview).length >= 2? <span className='discount'>Скидка 50%</span> : ''}
            </Button>
          )}
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
                          <Button className={ styles.btn } onClick={ () => { clickAvatar(avatar); } }> Узнать подробнее </Button>

                          :
                          <Button
                            className={ styles.btn }
                            onClick={ () => {
                              setOpenPay(true);
                              setTitle(`Покупка Аватара ${date.date.gender === 'male' ? avatarDate.part.maleTitle : avatarDate.part.femaleTitle}`);
                              setAvatarId(avatarDate.id);
                              setPrice(2000);
                            } }
                          >Раскрыть аватара</Button>
                      }
                    </div>
                  </>
                );
              })
            }
          </div>
        </div>
        <div>
          <Accordion className={ styles.title_av } title="Эти аватары отвечают за твои Отношения">
            <p>Эти три Аватара отвечают за сферу отношений. Помогут узнать какой партнер для вас идеальный, что будет укреплять ваши отношения, а что может их разрушить.</p>
          </Accordion>
          {avatarComm.filter(av => !av.purchased && !av.preview).length >= 2 && (
            <Button className={styles.btn_all} onClick={() => handleBuyAll(avatarComm)}>
              Купить всех {avatarComm.filter(av => !av.purchased && !av.preview).length} шт. 
              {avatarComm.filter(av => !av.purchased && !av.preview).length >= 2? <span className='discount'>Скидка 50%</span> : ''}
            </Button>
          )}
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
                          <Button className={ styles.btn } onClick={ () => { clickAvatar(avatar); } }> Узнать подробнее </Button>
                          :
                          <Button
                            className={ styles.btn }
                            onClick={ () => {
                              setOpenPay(true);
                              setAvatarId(avatarDate.id);
                              setTitle(`Покупка Аватара ${date.date.gender === 'male' ? avatarDate.part.maleTitle : avatarDate.part.femaleTitle}`);
                              setPrice(2000);
                            } }
                          >Раскрыть аватара</Button>
                      }
                    </div>
                  </>
                );
              })
            }
          </div>
        </div>
        <Button className={ styles.btn_action } onClick={ () => setOpenAction(true) }>Что дальше?</Button>
      </div>
      {
        openAction && <CustomModal onClose={ () => { setOpenAction(false); } }>
          <div className={ styles.text_modal }>
            Поздравляю, вы получили собственную инструкцию к своей жизни. Вы знаете всех своих аватаров.
            Сейчас, чтобы стать успешнее, счастливее и достичь желаемого, вам нужно лишь следовать простым рекомендациям в карточке аватаров.
            <br />
            Если у вас остались вопросы или хотите получить более полный разбор своей матрицы от автора метода, <Button className={ styles.btn_modal } onClick={ () => { router.push('/#services'); } }> жми сюда</Button>
          </div>
        </CustomModal>
      }
      { openPay &&
        <PayModal onClose={ () => { setOpenPay(false); } }
          emailUser={ date.date.email }
          peopleId={ date.date.id }
          gender = {date.date.gender }
          avatarId={ Array.isArray(avatarId) ? avatarId.join(',') : avatarId }
          title={ title }
          price={ price }
        /> }
    </div>
  );
};
