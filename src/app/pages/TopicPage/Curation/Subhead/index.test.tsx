import React from 'react';
import { render } from '@testing-library/react';
import { ServiceContextProvider } from '../../../../contexts/ServiceContext';
import Subhead from '.';

jest.mock('../../legacy/containers/ChartbeatAnalytics', () => {
  const ChartbeatAnalytics = () => <div>chartbeat</div>;
  return ChartbeatAnalytics;
});

/* eslint-disable react/prop-types */
const SubheadWithContext = ({
  children = '',
  href = '',
  service = 'mundo',
} = {}) => (
  <ServiceContextProvider service={service}>
    <Subhead href={href}>{children}</Subhead>
  </ServiceContextProvider>
);

describe('A11y', () => {
  it('should render an unordered list when there is more than one promo', () => {});
});

describe('isLive', () => {
  afterEach(() => {
    delete process.env.SIMORGH_APP_ENV;
  });
});
