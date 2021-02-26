import React from 'react';
import { node, string } from 'prop-types';
import podcastData from '#app/lib/config/podcastExternalLinks/loadableConfig';
import variantPropType from '../../models/propTypes/variants';
import { getVariant } from '#lib/utilities/variantHandler';

export const PodcastContext = React.createContext({});

export const PodcastContextProvider = ({ children, service, variant }) => {
  const LoadableContextProvider = podcastData[service];

  if (!LoadableContextProvider) {
    return null;
  }

  return (
    <LoadableContextProvider
      Context={PodcastContext}
      dataKey={getVariant({ service, variant })}
    >
      {children}
    </LoadableContextProvider>
  );
};

PodcastContextProvider.propTypes = {
  children: node.isRequired,
  service: string,
  variant: variantPropType,
};

PodcastContextProvider.defaultProps = {
  service: 'default',
  variant: 'default',
};
