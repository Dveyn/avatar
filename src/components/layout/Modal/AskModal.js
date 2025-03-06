import { useState } from 'react';
import styles from './AskModal.module.css';

export const AskModal = ({ onClose, ask }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);

  const [success, setSuccess] = useState('');

  const handleAnswer = (answer) => {
    setAnswers((prev) => [...prev, answer]);
    if (currentQuestionIndex < ask.length-1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
      const yesCount = answers.filter((a) => a === 'Да').length + (answer === 'Да' ? 1 : 0);
      const resultText = yesCount >= 4 ?
        'Вы в Ресурсе по этому Аватару. Если хочешь узнать как использовать Ресурс этого и других своих Аватаров нужно оплатить доступ.' :
        'Вы больше проявляется в Тени, чем в Ресурсе и чтобы получить рекомендации и узнать остальные свои Аватары нужно оплатить и получить доступ.';

      setSuccess(resultText);
      window.ym && window.ym(99937024,'reachGoal','ask_success')
    }

  };

  return (
    <div className={ styles.modal } onClick={ onClose }>
      <div className={ styles.modalContent } onClick={ (e) => e.stopPropagation() }>
        <div className={ styles.header }>
          <img src="/images/icon/background.svg" alt="background" />
        </div>
        <div className={ styles.modalTitle }>Пройди и узнай, в ресурсе ты или в тени</div>
        <div className={ styles.form }>
          { currentQuestionIndex < ask.length ? (
            <div className={ styles.question }>
              <p>{ ask[currentQuestionIndex] }</p>
              <div className={ styles.buttons }>
                <button onClick={ () => handleAnswer('Да') } className={ styles.yesButton }>Да</button>
                <button onClick={ () => handleAnswer('Нет') } className={ styles.noButton }>Нет</button>
              </div>
            </div> 
          ) : null }

          {success !== '' && <div className={styles.success}>{success}</div>}
        </div>
      </div>
    </div>
  );
};
