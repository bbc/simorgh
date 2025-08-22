import React from 'react';

const PromoReadTime = ({ children }) => {
  if (!children) {
    return null;
  }

  return <p>readtime: {children}</p>;
};

export default PromoReadTime;
