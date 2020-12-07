import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { requestMagicLink } from '../../api';

import styles from './auth.module.css';

const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const [linkToken, setLinkToken] = useState(null);

  const submitMagicLinkRequest = async () => {
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
      <div className={styles.form}>
        <h3>Password Reset</h3>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className={styles.submit}
          type="button"
          onClick={submitMagicLinkRequest}
          value="Submit"
        />
      </div>
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
