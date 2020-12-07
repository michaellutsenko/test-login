import React, { useContext, useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import StorageContext from '../storage';

import AccountActivation from '../domains/auth/AccountActivation';
import Login from '../domains/auth/Login';
import PasswordReset from '../domains/auth/PasswordReset';
import Dashboard from '../domains/dashboard/Dashboard';

const RootNavigator = () => {
  const [firstLaunch, setFirstLaunch] = useState(
    !localStorage.getItem('password') && !localStorage.getItem('token')
  );
  const { token } = useContext(StorageContext);

  useEffect(() => {
    if (firstLaunch) {
      setFirstLaunch(false);
    }
  });

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

        This only applies to the "/" route
      */}
      {firstLaunch && <Redirect to="/activation" />}

      <Route path="/" exact>
        {token && <Redirect to="/dashboard" />}
        {!token && <Redirect to="/login" />}
      </Route>

      {/* 
        Normally these magic links have some kind of encrypted data in them.
        Token represents that data
      */}
      <Route path="/activation/:token?" component={AccountActivation} />

      <Route path="/login" component={Login} />
      <Route path="/reset" component={PasswordReset} />
      <Route path="/dashboard" component={Dashboard} />
    </Switch>
  );
};

export default RootNavigator;
