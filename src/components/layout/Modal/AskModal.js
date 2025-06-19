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
        'Поздравляю! Ваш аватар в ресурсе! 🎉' :
        'Ваш аватар сейчас в тени, а значит, его энергия может негативно влиять на вашу жизнь';

      setSuccess(resultText);
      window.ym && window.ym(99937024, 'reachGoal', 'ask_success');
    }
  };

  const getProgressPercentage = () => {
    return ((currentQuestionIndex + 1) / ask.length) * 100;
  };

  return (
    <div className={styles.modal} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {/* Header с заголовком */}
        <div className={styles.modalHeader}>
          <button className={styles.closeButton} onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
          <h2 className={styles.modalTitle}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 12l2 2 4-4"/>
              <path d="M21 12c-1 0-2-1-2-2s1-2 2-2 2 1 2 2-1 2-2 2z"/>
              <path d="M3 12c1 0 2-1 2-2s-1-2-2-2-2 1-2 2 1 2 2 2z"/>
              <path d="M12 3c0 1-1 2-2 2s-2-1-2-2 1-2 2-2 2 1 2 2z"/>
              <path d="M12 21c0-1 1-2 2-2s2 1 2 2-1 2-2 2-2-1-2-2z"/>
            </svg>
            Пройди и узнай, в ресурсе ты или в тени
          </h2>
        </div>

        {/* Прогресс бар */}
        <div className={styles.progressContainer}>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill} 
              style={{ width: `${getProgressPercentage()}%` }}
            ></div>
          </div>
          <span className={styles.progressText}>
            {currentQuestionIndex + 1} из {ask.length}
          </span>
        </div>

        <div className={styles.modalBody}>
          {currentQuestionIndex < ask.length ? (
            <div className={styles.questionContainer}>
              <div className={styles.questionCard}>
                <div className={styles.questionIcon}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                    <path d="M12 17h.01"/>
                  </svg>
                </div>
                <h3 className={styles.questionText}>{ask[currentQuestionIndex]}</h3>
                <div className={styles.answerButtons}>
                  <button 
                    onClick={() => handleAnswer('Да')} 
                    className={`${styles.answerButton} ${styles.yesButton}`}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 6L9 17l-5-5"/>
                    </svg>
                    Да
                  </button>
                  <button 
                    onClick={() => handleAnswer('Нет')} 
                    className={`${styles.answerButton} ${styles.noButton}`}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 6L6 18M6 6l12 12"/>
                    </svg>
                    Нет
                  </button>
                </div>
              </div>
            </div>
          ) : null}

          {success !== '' && (
            <div className={styles.resultContainer}>
              <div className={`${styles.resultCard} ${isResours ? styles.successResult : styles.shadowResult}`}>
                <div className={styles.resultIcon}>
                  {isResours ? (
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ) : (
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-7.73A2 2 0 1 1 19 12H2m7.73 7.73A2 2 0 1 0 11 20H2"/>
                    </svg>
                  )}
                </div>
                <h3 className={styles.resultTitle}>
                  {isResours ? 'Отличный результат!' : 'Результат теста'}
                </h3>
                <p className={styles.resultText}>{success}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
