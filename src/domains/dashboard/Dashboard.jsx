import React from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { signOut } from '../../api';

const Dashboard = () => {
  const history = useHistory();
  const token = localStorage.getItem('token');

  return token ? (
    <div>
      <div>
        <span>John Doe</span>
        <a
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();

            signOut().then(() => history.push('/login'));
          }}
        >
          Sign Out
        </a>
      </div>

      <h1>Welcome, John Doe</h1>
    </div>
  ) : (
    // Quick and simple redirect back to login page
    // if the user hasn't logged in
    <Redirect to="/login" />
  );
};

export default Dashboard;
