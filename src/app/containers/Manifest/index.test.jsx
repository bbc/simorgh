import React from 'react';
import ManifestContainer from './index';
import { ServiceContext } from '../../contexts/ServiceContext';
import { shouldShallowMatchSnapshot } from '../../../testHelpers';

const contextWithManifestPath = {
  manifestPath: '/manifest.json',
  service: 'news',
};
const contextWithoutManifestPath = {
  service: 'news',
};

const ManifestWithContext = context => (
  <ServiceContext.Provider value={context}>
    <ManifestContainer />
  </ServiceContext.Provider>
);

shouldShallowMatchSnapshot(
  'should render with context manifest Path',
  ManifestWithContext(contextWithManifestPath),
);

shouldShallowMatchSnapshot(
  'should render with default manifest Path',
  ManifestWithContext(contextWithoutManifestPath),
);
