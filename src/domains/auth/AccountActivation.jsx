import React from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { activateAccount } from '../../api';

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
    <div>
      <h3>This activation link is no longer valid</h3>
      <h4>We love you nonetheless :*</h4>
    </div>
  ) : (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>Welcome, John Doe</h3>
      <h4>Create a password for your new account</h4>
      <input
        ref={register}
        name="email"
        disabled={true}
        value="john_doe@somemail.com"
      />
      <input ref={register} name="password" placeholder="Password" />
      <input type="submit" value="Submit" />
    </form>
  );
};

export default AccountActivation;
