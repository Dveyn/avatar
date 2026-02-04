import { fetchConfirmEmail, fetchSetPassword } from '@@/utils/api';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import styles from './confirm-email.module.css';
import Head from 'next/head';

const ConfirmEmail = ({ status }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { id } = router.query;

  // Initialize analytics
  useEffect(() => {
    try {
      // Initialize Yandex.Metrika
      if (typeof window !== 'undefined' && window.ym) {
        window.ym(99937024, 'init', {
          clickmap: true,
          trackLinks: true,
          accurateTrackBounce: true,
          webvisor: true
        });
      } else {
        console.error('Yandex.Metrika is not defined', { userId: id });
      }

      // Initialize VK Pixel
      if (typeof window !== 'undefined' && window._tmr) {
        window._tmr.push({ type: 'init', id: 3628641 });
      } else {
        console.error('VK Pixel (_tmr) is not defined', { userId: id });
      }
    } catch (error) {
      console.error('Analytics init error', { userId: id, error: error?.message || error });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const response = await fetchSetPassword(id, password);

      if (response === 200) {
        setSuccess(true);
        
        // Track successful registration
        if (typeof window !== 'undefined') {
          try {
            // Yandex.Metrika
            if (window.ym) {
              window.ym(99937024, 'reachGoal', 'confirm_reg');
            } else {
              throw new Error('ym не определен');
            }
            
            // VK Pixel
            if (window._tmr) {
              window._tmr.push({ 
                type: 'reachGoal', 
                id: 3628641, 
                goal: 'registration_success'
              });
            } else {
              throw new Error('_tmr не определен');
            }
          } catch (analyticsError) {
            console.error('Analytics error (confirm email)', analyticsError);
          }
        }
      } else {
        setError('Ошибка при установке пароля');
        console.error('Set password failed', { userId: id, status: response });
      }
    } catch (error) {
      setError('Произошла ошибка');
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (status !== 200) {
    return (
      <div className={ styles.body }>
        <div className={ styles.form } >
          <div className={ styles.form_body }>
            <span className={ styles.title }> Не удалось подтвердить почту</span>
          </div>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className={ styles.body }>
        <div className={ styles.form } >
          <div className={ styles.form_body }>
            <span className={ styles.title }>
              Пароль успешно установлен. Можете войти в аккаунт.
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Аватары | Подтверждение почты</title>
        <meta name="robots" content="noindex" />
      </Head>
      <div className={ styles.body }>
        <div className={ styles.form }>
          <div className={ styles.form_body }>
            <h2 className={ styles.title }>Установите новый пароль</h2>
            <form onSubmit={ handleSubmit }>
              <div>
                <label className={ styles.label } htmlFor="password">Пароль:</label>
                <input
                  className={ styles.input }
                  type="password"
                  id="password"
                  value={ password }
                  onChange={ (e) => setPassword(e.target.value) }
                  required
                />
              </div>
              <div>
                <label className={ styles.label } htmlFor="confirmPassword">Подтверждение пароля:</label>
                <input
                  className={ styles.input }
                  type="password"
                  id="confirmPassword"
                  value={ confirmPassword }
                  onChange={ (e) => setConfirmPassword(e.target.value) }
                  required
                />
              </div>
              { error && <div style={ { color: 'red' } }>{ error }</div> }
              <button className={ styles.btn } type="submit" disabled={ loading }>
                { loading ? 'Загрузка...' : 'Установить пароль' }
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps({ params }) {
  const { id } = params;

  const response = await fetchConfirmEmail(id);
  const status = response;

  return {
    props: { status },
  };
}

export default ConfirmEmail;
