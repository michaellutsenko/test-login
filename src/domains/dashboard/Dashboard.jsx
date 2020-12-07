import React, { useContext } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { signOut } from '../../api';
import StorageContext from '../../storage';

import styles from './dashboard.module.css';

const Dashboard = () => {
  const history = useHistory();
  const { token, setToken } = useContext(StorageContext);

  return token ? (
    <div>
      <div className={styles.header}>
        <span className={styles.dashboardCaption}>Dashboard</span>
        <span className={styles.user}>John Doe</span>
        <span
          className={styles.signOut}
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
