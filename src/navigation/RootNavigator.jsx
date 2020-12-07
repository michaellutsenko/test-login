import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

const RootNavigator = () => {
  return (
    <Switch>
      <Redirect from="/" exact to="/login" />
      <Route path="/activation" />
      <Route path="/login" />
      <Route path="/reset" />
      <Route path="/dashboard" />
    </Switch>
  );
};

export default RootNavigator;
