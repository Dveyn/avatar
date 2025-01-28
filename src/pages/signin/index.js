import { useState } from 'react';
import styles from './signin.module.css';
import { signin } from '@@/utils/api';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

const Signin = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await signin({ email: email, password: password });
    if (result?.accessToken && result?.refreshToken) {
      Cookies.set('accessToken', result.accessToken, { secure: true, sameSite: 'Strict', expires: 30 });
      Cookies.set('refreshToken', result.refreshToken, { secure: true, sameSite: 'Strict', expires: 30 });
      setSuccess(true);
      router.push('/profile');

    } else {
      setError('Ошибка авторизации. Проверьте данные.');
    }

  };
  return (
    <div className={ styles.body }>
      <div className={ styles.form }>
        <div className={ styles.form_body }>
          <h2 className={ styles.title }>Вход</h2>
          <div className={ styles.pretitle }>Внимание! Мы обновили сайт, если не получается войти в профиль, вопспользуйтесь востановлением пароля</div>
          <form onSubmit={ handleSubmit }>
            <div>
              <label className={ styles.label } htmlFor="email">Email:</label>
              <input
                className={ styles.input }
                type="email"
                id="email"
                value={ email }
                onChange={ (e) => setEmail(e.target.value) }
                required
              />
            </div>
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
            { error && <div style={ { color: 'red' } }>{ error }</div> }
            <button className={ styles.btn } type="submit" disabled={ loading }>
              { loading ? 'Загрузка...' : 'Войти' }
            </button>

            <div className={ styles.btn } onClick={ () => { router.push('/forgot'); } }>Забыли пароль</div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;
