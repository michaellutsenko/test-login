import React from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { activateUser } from '../../api';

const AccountActivation = () => {
  const history = useHistory();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (formData) => {
    try {
      await activateUser(formData);
      history.push('/login');
    } catch {
      // Normally, here we would've updated the UI to show the error
      alert('Something went wrong');
    }
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
      <input type="submit" value="Submit" />
    </form>
  );
};

export default AccountActivation;
