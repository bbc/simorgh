import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { string } from 'prop-types';

const AdSlot = ({ type }) => {
  const location = useLocation();
  useEffect(() => {
    if (window.dotcom) {
      window.dotcom.cmd.push(() => {
        window.dotcom.ads.registerSlot(type);
      });
    }
  }, [type, location]);

  return <div id={`dotcom-${type}`} className="dotcom-ad" />;
};

AdSlot.propTypes = {
  type: string.isRequired,
};

export default AdSlot;
