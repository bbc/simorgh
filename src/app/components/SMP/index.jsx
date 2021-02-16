import React from 'react';
import { Helmet } from 'react-helmet';
import loadable from '@loadable/component';

import onClient from '#lib/utilities/onClient';

const exampleSettings = {
  product: 'iplayer',
  responsive: true,
  playlistObject: {
    title: 'BBC One',
    items: [
      {
        serviceID: 'bbc_one_london',
      },
    ],
  },
};
const LoadableSMP = loadable(() =>
  import('smp-react/dist/components/PlayerCore'),
);

const SMP = () => {
  if (!onClient()) return null;

  return (
    <div>
      <Helmet>
        <script
          type="text/javascript"
          src="https://static.bbci.co.uk/frameworks/requirejs/0.13.0/sharedmodules/require.js"
        />
      </Helmet>
      <LoadableSMP settings={exampleSettings} />
    </div>
  );
};

export default SMP;
