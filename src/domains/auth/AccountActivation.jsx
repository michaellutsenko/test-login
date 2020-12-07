import React from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { user } from '../../storage';

const AccountActivation = () => {
  const history = useHistory();
  const { register, handleSubmit } = useForm();

  const onSubmit = ({ firstName, lastName, password }) => {
    user.updateUserData({ firstName, lastName });
    localStorage.setItem('password', password);
    history.push('/login');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        ref={register}
        name="email"
        disabled={true}
        value="user@somemail.com"
      />
      <input ref={register} name="password" placeholder="Password" />
      <input ref={register} name="firstName" placeholder="First name" />
      <input ref={register} name="lastName" placeholder="Last name" />
    </form>
  );
};

export default AccountActivation;
