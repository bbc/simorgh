import React from 'react';
import { string } from 'prop-types';
import { Helmet } from 'react-helmet';

const AdSlot = ({ uniqueId }) => (
  <>
    <Helmet
      script={[
        {
          type: 'text/javascript',
          // Once the Ad script has loaded, ads pushed to `cmd` are rendered
          innerHTML: `
            window.dotcom.cmd.push(() => {
              window.dotcom.ads.registerSlot('${uniqueId}');
            });
          `,
        },
      ]}
    />
    <div id={`dotcom-${uniqueId}`} className="dotcom-ad" />
  </>
);

AdSlot.propTypes = {
  uniqueId: string.isRequired,
};

export default AdSlot;
