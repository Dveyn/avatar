import { useState } from 'react';
import styles from './AskModal.module.css';
import { Button } from '@@/components/ui';

export const AskModal = ({ onClose, ask }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [isResours, setIsResours] = useState(false);

  const [success, setSuccess] = useState('');

  const handleAnswer = (answer) => {
    setAnswers((prev) => [...prev, answer]);
    if (currentQuestionIndex < ask.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
      const yesCount = answers.filter((a) => a === 'Да').length + (answer === 'Да' ? 1 : 0);
      setIsResours(yesCount >= 4 );
      const resultText = yesCount >= 4 ?
        'Поздравляю! Ваш аватар Характера в ресурсе! ' :
        'Ваш аватар сейчас в тени, а значит, его энергия может негативно влиять на вашу жизнь';

      setSuccess(resultText);
      window.ym && window.ym(99937024, 'reachGoal', 'ask_success');
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
          { success !== '' && (
            <>
              <div className={ styles.success }>{ success }</div>
              {/* { isResours? <Button>Как держать аватара в ресурсе</Button> : <Button>Вывести аватара в ресурс</Button> } */}
            </>
          ) }
        </div>
      </div>
    </div>
  );
};
