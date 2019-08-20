import React, { useState } from 'react';
import { node } from 'prop-types';
import { getCookiePolicy, personalisationEnabled } from './cookies';

export const UserContext = React.createContext({});

export const UserContextProvider = ({ children }) => {
  const [cookiePolicy, setCookiePolicy] = useState(getCookiePolicy());

  const updateCookiePolicy = () => setCookiePolicy(getCookiePolicy());

  const value = {
    cookiePolicy,
    updateCookiePolicy,
    personalisationEnabled: personalisationEnabled(cookiePolicy),
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

UserContextProvider.propTypes = {
  children: node.isRequired,
};
