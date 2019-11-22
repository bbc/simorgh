import React, { useState } from 'react';
import { node } from 'prop-types';
import { getCookiePolicy, personalisationEnabled } from './cookies';
import Chartbeat from './Chartbeat';
import usePreferredVariant from './usePreferredVariant';

export const UserContext = React.createContext({});

export const UserContextProvider = ({ children }) => {
  const [cookiePolicy, setCookiePolicy] = useState(getCookiePolicy());
  const [chartbeatConfig, sendCanonicalChartbeatBeacon] = useState(null);
  const [preferredVariant, setPreferredVariant] = usePreferredVariant();

  const value = {
    cookiePolicy,
    sendCanonicalChartbeatBeacon,
    updateCookiePolicy: () => setCookiePolicy(getCookiePolicy()),
    personalisationEnabled: personalisationEnabled(cookiePolicy),
    preferredVariant,
    setPreferredVariant,
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
