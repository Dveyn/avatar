import { useState } from 'react';
import styles from './forgot.module.css';
import { forgot } from '@@/utils/api';
import { useRouter } from 'next/router';

const Forgot = () => {

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await forgot({ email: email });
    if (result?.isError) {
      setError(result.message);
      setSuccess('')
    } else {
      setSuccess('Проверьте указанную почту');
      setError('')
    }
  };
  return (
    <div className={ styles.body }>
      <div className={ styles.form }>
        <div className={ styles.form_body }>
          <h2 className={ styles.title }>Востановление парля</h2>
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
            { error && <div style={ { color: 'red' } }>{ error }</div> }
            { success && <div style={ { color: 'green' } }>{ success }</div> }
            <button className={ styles.btn } type="submit" disabled={ loading }>
              { loading ? 'Загрузка...' : 'Востановить' }
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Forgot;
