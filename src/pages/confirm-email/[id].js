import { fetchConfirmEmail, fetchSetPassword } from '@@/utils/api';
import React, { useState } from 'react';
import { useRouter } from 'next/router';

import styles from './confirm-email.module.css';


const ConfirmEmail = ({ status }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { id } = router.query;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Проверка на совпадение паролей
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
      } else {
        setError('Ошибка при установке пароля');
      }
    } catch (error) {
      setError('Произошла ошибка');
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
