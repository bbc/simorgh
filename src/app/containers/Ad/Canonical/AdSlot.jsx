import React, { useEffect } from 'react';
import { string } from 'prop-types';
import { useLocation } from 'react-router-dom';

const AdSlot = ({ uniqueId }) => {
  const location = useLocation();
  useEffect(() => {
    if (window.dotcom) {
      window.dotcom.cmd.push(() => {
        window.dotcom.ads.registerSlot(uniqueId);
      });
    }

    return () => {
      if (window.dotcom) {
        window.dotcom.cmd.push(() => {
          window.dotcom.ads.destroySlot(uniqueId);
        });
      }
    };
  }, [uniqueId, location]);

  return <div id={`dotcom-${uniqueId}`} className="dotcom-ad" />;
};

AdSlot.propTypes = {
  uniqueId: string.isRequired,
};

export default AdSlot;
