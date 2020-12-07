import React, { useContext } from 'react';
import { useHistory, Link, Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { signIn } from '../../api';
import StorageContext from '../../storage';

const Login = () => {
  const history = useHistory();
  const { token, setToken } = useContext(StorageContext);
  const { register, handleSubmit } = useForm();

  const onSubmit = async (formData) => {
    try {
      const response = await signIn(formData);
      setToken(response.data.token);
      history.push('/dashboard');
    } catch {
      alert('The data you entered does not match any account');
    }
  };

  return !!token ? (
    <Redirect to="/dashboard" />
  ) : (
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
