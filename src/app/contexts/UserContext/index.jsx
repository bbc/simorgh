import React, { useState } from 'react';
import { node } from 'prop-types';
import {
  getCookiePolicy,
  personalisationEnabled,
  setPreferredVariantCookie,
} from './cookies';
import Chartbeat from './Chartbeat';

export const UserContext = React.createContext({});

export const UserContextProvider = ({ children }) => {
  const [cookiePolicy, setCookiePolicy] = useState(getCookiePolicy());
  const [chartbeatConfig, sendCanonicalChartbeatBeacon] = useState(null);

  const value = {
    cookiePolicy,
    sendCanonicalChartbeatBeacon,
    updateCookiePolicy: () => setCookiePolicy(getCookiePolicy()),
    personalisationEnabled: personalisationEnabled(cookiePolicy),
    setPreferredVariantCookie,
  };

  return (
    <UserContext.Provider value={value}>
      <Chartbeat config={chartbeatConfig} />
      {children}
    </UserContext.Provider>
  );
};

UserContextProvider.propTypes = {
  children: node.isRequired,
};
