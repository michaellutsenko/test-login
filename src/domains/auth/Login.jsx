import React, { useContext } from 'react';
import { useHistory, Link, Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { signIn } from '../../api';
import StorageContext from '../../storage';

import { emailRegexp } from './emailRegexp';
import styles from './auth.module.css';

const Login = () => {
  const history = useHistory();
  const { token, setToken } = useContext(StorageContext);
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async (formData) => {
    try {
      const response = await signIn(formData);
      setToken(response.data.token);
      history.push('/dashboard');
    } catch {
      alert('The data you entered does not match any account');
    }
  };

  // If a token exists, then we are still logged in and can be
  // redirected to dashboard
  return !!token ? (
    <Redirect to="/dashboard" />
  ) : (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Sign In</h2>
        <input
          ref={register({ required: true, pattern: emailRegexp })}
          name="email"
          placeholder="Email"
        />
        {errors.email && errors.email.type === 'required' && (
          <div className={styles.error}>Email is required</div>
        )}
        {errors.email && errors.email.type === 'pattern' && (
          <div className={styles.error}>Invalid email</div>
        )}

        <input
          ref={register({ required: true, minLength: 6 })}
          name="password"
          placeholder="Password"
        />
        {errors.password && errors.password.type === 'required' && (
          <div className={styles.error}>Password is required</div>
        )}
        {errors.password && errors.password.type === 'minLength' && (
          <div className={styles.error}>
            Password must contain at least 6 symbols
          </div>
        )}
        <Link to="/reset">Reset password</Link>
        <input className={styles.submit} type="submit" value="Sign in" />
      </form>
    </div>
  );
};

export default Login;
