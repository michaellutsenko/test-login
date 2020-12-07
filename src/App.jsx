// This component acts as container for both the app's content
// and its local state
import React, { useState } from 'react';
import RootNavigator from './navigation/RootNavigator';
import StorageContext from './storage';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  return (
    <StorageContext.Provider value={{ token, setToken }}>
      <RootNavigator />
    </StorageContext.Provider>
  );
};

export default App;
