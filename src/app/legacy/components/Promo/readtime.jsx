import React from 'react';

const PromoReadTime = ({ children, isLive, className = '' }) => {
  if (!children || isLive) {
    return null;
  }

  return <p className={className}>readtime: {children}</p>;
};

export default PromoReadTime;
