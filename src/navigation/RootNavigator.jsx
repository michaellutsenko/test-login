import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import AccountActivation from '../domains/auth/AccountActivation';
import Login from '../domains/auth/Login';
import PasswordReset from '../domains/auth/PasswordReset';
import Dashboard from '../domains/dashboard/Dashboard';

const RootNavigator = () => {
  const token = localStorage.getItem('token');
  const password = localStorage.getItem('password');
  return (
    <Switch>
      {/* 
        These redirects are sort of a crutch. I wanted to emulate certain behaviour:
        - On first launch it should open account activation, to show that the user
        is entering the app for the first through the account activation page, as
        presumed in the task description.
        - In other cases the root route (tautology!) should either show login page
        or dashboard if an access token exists (therefore, the user should remain
        logged in)

        This only applies to the "/"" route
      */}
      <Route path="/" exact>
        {token && <Redirect to="/dashboard" />}
        {!token && password && <Redirect to="/login" />}
        {!token && !password && <Redirect to="/activation" />}
      </Route>

      <Route path="/activation/:token?" component={AccountActivation} />
      <Route path="/login" component={Login} />
      <Route path="/reset" component={PasswordReset} />
      <Route path="/dashboard" component={Dashboard} />
    </Switch>
  );
};

export default RootNavigator;
