// This context emulates local state
// In real life it could be Redux or MobX, or indeed React Context
import React from 'react';

const StorageContext = React.createContext();

export default StorageContext;
