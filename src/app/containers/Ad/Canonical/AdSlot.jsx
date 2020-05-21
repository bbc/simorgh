import React, { useEffect } from 'react';
import { string } from 'prop-types';

const AdSlot = ({ uniqueId }) => {
  useEffect(() => {
    window.dotcom.cmd.push(() => {
      window.dotcom.ads.registerSlot(uniqueId);
    });
  }, [uniqueId]);

  return <div id={`dotcom-${uniqueId}`} className="dotcom-ad" />;
};

AdSlot.propTypes = {
  uniqueId: string.isRequired,
};

export default AdSlot;
