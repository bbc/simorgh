import React from 'react';
import { storiesOf } from '@storybook/react';
import afriqueData from '#data/afrique/cpsAssets/48465371';
import FeatureIndexMain from '.';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import { RequestContextProvider } from '#contexts/RequestContext';

const serviceDataSets = {
  afrique: afriqueData,
};

const stories = storiesOf('Main|Feature Index', module);

Object.keys(serviceDataSets).forEach(service => {
  stories.add(`Feature Index - ${service}`, () => (
    <ToggleContextProvider>
      <ServiceContextProvider service={service}>
        <RequestContextProvider isAmp={false} pageType="FIX" service={service}>
          <FeatureIndexMain featureIndexData={serviceDataSets[service]} />
        </RequestContextProvider>
      </ServiceContextProvider>
    </ToggleContextProvider>
  ));
});
