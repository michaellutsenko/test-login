import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { signIn } from '../../api';

const Login = () => {
  const history = useHistory();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (formData) => {
    try {
      await signIn(formData);
      history.push('/dashboard');
    } catch {
      alert('The data you entered does not match any account');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>Sign In</h3>
      <input ref={register} name="email" placeholder="Email" />
      <input ref={register} name="password" placeholder="Password" />
      <Link to="/reset">Reset password</Link>
      <input type="submit" value="Sign in" />
    </form>
  );
};

export default Login;
