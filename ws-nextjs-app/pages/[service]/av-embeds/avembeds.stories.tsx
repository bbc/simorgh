import React from 'react';
import AvEmbedsPage from './AvEmbedsPageLayout';
import parseAvRoute from './parseAvRoute';

const Component = ({ requestUrl }: { requestUrl: string }) => {
  const parsedAvRoute = parseAvRoute(requestUrl);

  const fixtureData = {
    input: requestUrl,
    output: parsedAvRoute,
  };

  return <AvEmbedsPage pageData={fixtureData} />;
};

export default {
  title: 'Pages/AvEmbeds Page',
  Component,
  parameters: {
    layout: 'fullscreen',
  },
};

export const Example = () => (
  <Component requestUrl="serbian/cyr/av-embeds/srbija-50103048/pid/p07rfhrv" />
);
