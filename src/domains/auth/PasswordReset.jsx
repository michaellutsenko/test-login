import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { requestMagicLink } from '../../api';

import styles from './auth.module.css';
import { emailRegexp } from './emailRegexp';

const PasswordReset = () => {
  const { register, handleSubmit, errors } = useForm();
  const [linkToken, setLinkToken] = useState(null);

  const onSubmit = async ({ email }) => {
    try {
      const token = await requestMagicLink(email);
      setLinkToken(token);
    } catch {
      // Once again, skipping a proper error display for a quick one
      alert('Something went wrong');
    }
  };

  return !linkToken ? (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3>Password Reset</h3>
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
        <input className={styles.submit} type="submit" value="Submit" />
      </form>
    </div>
  ) : (
    <div className={styles.container}>
      <div className={styles.magicLink}>
        {/* Just kidding with trademark, don't send your lawyers after me */}
        <h2>Here is your magic link&trade;</h2>
        <h3>Use it to reset your password</h3>
        <Link to={`/activation/${linkToken}`}>/activation/{linkToken}</Link>
        <div>It's also been sent to your email, so you can do it later</div>
      </div>
    </div>
  );
};

export default PasswordReset;
