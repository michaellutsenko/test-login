import React from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { activateAccount } from '../../api';

import styles from './auth.module.css';

const AccountActivation = () => {
  const history = useHistory();
  const { register, handleSubmit } = useForm();

  // This is not a pretty way, but the magic link can be expired
  // or we may also try to enter the activation page when the account
  // has already been activated.
  // This page would request certain data from the server prior to
  // render, so a useEffect could be of use here, but I'm skipping it
  // to save time.
  const accountActivated = !!localStorage.getItem('password');
  console.log(accountActivated);

  const onSubmit = async (formData) => {
    try {
      await activateAccount(formData);
      history.push('/login');
    } catch {
      // Normally, here we would've updated the UI to show the error
      alert('Something went wrong');
    }
  };

  return accountActivated ? (
    <div className={styles.container}>
      <h2>This activation link is no longer valid</h2>
      <h3>We love you nonetheless :*</h3>
    </div>
  ) : (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Welcome, John Doe</h2>
        <h3>Create a password for your new account</h3>
        <input
          ref={register}
          name="email"
          disabled={true}
          value="john_doe@somemail.com"
        />
        <input
          ref={register}
          type="password"
          name="password"
          placeholder="Password"
        />
        <input className={styles.submit} type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default AccountActivation;
