/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { personalities } from '@@/utils/personality';
import styles from './Avatars.module.css';
import { Button } from '@@/components/ui';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleBuyAll = (avatars) => {
    const notPurchasedAvatars = avatars.filter(av => !av.purchased);
    if (notPurchasedAvatars.length === 0) return;
    console.log(avatars, notPurchasedAvatars)
    const discount =  1;
    const totalPrice = notPurchasedAvatars.length * 700 * discount;

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

  const renderAvatarSection = (avatars, title, description, icon) => {
    const notPurchasedCount = avatars.filter(av => !av.purchased && !av.preview).length;
    
    return (
      <div className={styles.avatarSection}>
        <Accordion 
          className={styles.sectionTitle} 
          title={
            <div className={styles.sectionTitleContent}>
              <div className={styles.sectionIcon}>{icon}</div>
              <span>{title}</span>
            </div>
          }
        >
          <p className={styles.sectionDescription}>{description}</p>
        </Accordion>
        
        {notPurchasedCount >= 2 && (
          <Button 
            className={styles.buyAllButton} 
            onClick={() => handleBuyAll(avatars)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
            </svg>
            Купить всех {notPurchasedCount} шт.
            <span className={styles.discount}>Скидка 50%</span>
          </Button>
        )}
        
        <div className={styles.avatarGrid}>
          {avatars.map((avatar, index) => {
            const avatarDate = personalities.find(el => el.id === avatar.avatar_id);
            return (
              <div 
                key={avatar.id} 
                className={`${styles.avatarCard} ${avatar.purchased || avatar.preview ? styles.unlocked : styles.locked}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={styles.avatarImageContainer}>
                  <img
                    src={avatarDate.part[`${date.date.gender === 'male' ? 'maleImageSrc' : 'femaleImageSrc'}`]}
                    onClick={() => clickAvatar(avatar)}
                    className={styles.avatarImage}
                  />
                  {!avatar.purchased && !avatar.preview && (
                    <div className={styles.lockOverlay}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                        <circle cx="12" cy="16" r="1"/>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                      </svg>
                    </div>
                  )}
                </div>
                
                <div className={styles.avatarInfo}>
                  <h4 className={styles.avatarName}>
                    {date.date.gender === 'male' ? avatarDate.part.maleTitle : avatarDate.part.femaleTitle}
                  </h4>
                  
                  {avatar.preview === 1 || avatar.purchased === 1 ? (
                    <Button 
                      className={styles.viewButton} 
                      onClick={() => clickAvatar(avatar)}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                      Узнать подробнее
                    </Button>
                  ) : (
                    <Button
                      className={styles.unlockButton}
                      onClick={() => {
                        setOpenPay(true);
                        setTitle(`Покупка Аватара ${date.date.gender === 'male' ? avatarDate.part.maleTitle : avatarDate.part.femaleTitle}`);
                        setAvatarId(avatarDate.id);
                        setPrice(700);
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                      </svg>
                      Раскрыть аватара
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderModals = () => {
    if (!mounted) return null;

    return (
      <>
        {openAction && createPortal(
          <CustomModal onClose={() => setOpenAction(false)}>
            <div className={styles.modalContent}>
              <h3 className={styles.modalTitle}>Поздравляем!</h3>
              <p className={styles.modalText}>
                Вы получили собственную инструкцию к своей жизни. Вы знаете всех своих аватаров.
                Сейчас, чтобы стать успешнее, счастливее и достичь желаемого, вам нужно лишь следовать простым рекомендациям в карточке аватаров.
              </p>
              <p className={styles.modalText}>
                Если у вас остались вопросы или хотите получить более полный разбор своей матрицы от автора метода, нажмите кнопку ниже.
              </p>
              <Button 
                className={styles.modalButton} 
                onClick={() => router.push('/#services')}
              >
                Получить полный разбор
              </Button>
            </div>
          </CustomModal>,
          document.body
        )}

        {openPay && createPortal(
          <PayModal 
            onClose={() => setOpenPay(false)}
            emailUser={date.date.email}
            peopleId={date.date.id}
            gender={date.date.gender}
            avatarId={Array.isArray(avatarId) ? avatarId.join(',') : avatarId}
            title={title}
            price={price}
          />,
          document.body
        )}
      </>
    );
  };

  return (
    <>
      <div className={styles.body}>
        <div className={styles.header}>
          <div className={styles.userInfo}>
            <div className={styles.userAvatar}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
              </svg>
            </div>
            <div className={styles.userDetails}>
              <h1 className={styles.userName}>{date.date.name}</h1>
              <p className={styles.userSubtitle}>Ваши аватары показывают ваш характер</p>
            </div>
          </div>
        </div>

        {/* Бесплатные аватары */}
        {renderAvatarSection(
          avatarFree,
          "Базовые аватары",
          "Эти аватары показывают основные черты вашего характера и личности.",
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
        )}

        {/* Ресурсы и таланты */}
        {renderAvatarSection(
          avatarResourse,
          "Ресурсы и таланты",
          "Эти Аватары показывают ваши ресурсы и таланты. Помогут вам увидеть в какой сфере вам легче реализоваться и что поможет вам реализовать ваш потенциал.",
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        )}

        {/* Внутренняя суть */}
        {renderAvatarSection(
          avatarEssence,
          "Внутренняя суть",
          "Поможет узнать как вам быть в ресурсе, гармонии с собой и что поможет найти дело жизни.",
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
            <line x1="9" y1="9" x2="9.01" y2="9"/>
            <line x1="15" y1="9" x2="15.01" y2="9"/>
          </svg>
        )}

        {/* Финансы */}
        {renderAvatarSection(
          avatarFinance,
          "Финансы",
          "Эти три Аватара отвечают за ваши Финансы. Зная их вы сможете определить в какой сфере вам легче зарабатывать деньги, как расширить финансовый поток и чего стоит избегать чтобы не сливать свою энергию.",
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
          </svg>
        )}

        {/* Отношения */}
        {renderAvatarSection(
          avatarComm,
          "Отношения",
          "Эти три Аватара отвечают за сферу отношений. Помогут узнать какой партнер для вас идеальный, что будет укреплять ваши отношения, а что может их разрушить.",
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="m22 21-2-2"/>
            <path d="m16 16 4 4 4-4"/>
          </svg>
        )}

        <div className={styles.actionSection}>
          <Button className={styles.actionButton} onClick={() => setOpenAction(true)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6"/>
            </svg>
            Что дальше?
          </Button>
        </div>
      </div>

      {/* Модальные окна рендерятся в корне документа через Portal */}
      {renderModals()}
    </>
  );
};
