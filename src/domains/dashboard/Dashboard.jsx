import React from 'react';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { user } from '../../storage';
import { signOut } from '../../api';

const Dashboard = () => {
  const history = useHistory();
  const { firstName, lastName } = user;

  return (
    <div>
      <div>
        <span>
          {firstName} {lastName}
        </span>
        <a
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();

            signOut.then(() => history.push('/login'));
          }}
        >
          Sign Out
        </a>
      </div>

      <h1>Welcome, {firstName}</h1>
    </div>
  );
};

export default observer(Dashboard);
