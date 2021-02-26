import React from 'react';
import { element, string } from 'prop-types';

import variantPropType from '#models/propTypes/variants';
import { PodcastContextProvider } from '#contexts/PodcastContext';

const WithPodcastData = Component => {
  const Container = props => {
    const { service, variant } = props;
    return (
      <PodcastContextProvider service={service} variant={variant}>
        <Component {...props} />
      </PodcastContextProvider>
    );
  };

  Container.propTypes = {
    service: string.isRequired,
    variant: variantPropType,
  };

  Container.defaultProps = {
    variant: null,
  };

  return Container;
};

WithPodcastData.propTypes = {
  Component: element,
};

export default WithPodcastData;
