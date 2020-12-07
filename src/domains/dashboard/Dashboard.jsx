import React, { useContext } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { signOut } from '../../api';
import StorageContext from '../../storage';

const Dashboard = () => {
  const history = useHistory();
  const { token, setToken } = useContext(StorageContext);

  return token ? (
    <div>
      <div>
        <span>John Doe</span>
        <span
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();

            signOut().then(() => {
              setToken(null);
              history.push('/login');
            });
          }}
        >
          Sign Out
        </span>
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
