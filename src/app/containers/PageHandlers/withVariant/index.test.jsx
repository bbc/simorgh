import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import { useParams, useLocation } from 'react-router-dom';
import withVariant from '.';

jest.mock('react-router-dom', () => ({
  useParams: jest.fn(),
  useLocation: jest.fn(),
  // eslint-disable-next-line react/prop-types
  Redirect: ({ to: { pathname } }) => <p>You are going to {pathname}</p>,
}));

const Component = () => <h1>This is the BBC.</h1>;
const WithVariantHOC = withVariant(Component);

const testServiceVariantRedirect = ({ service, variant, redirectTo }) => {
  beforeEach(() => {
    useParams.mockReturnValue({
      service,
      variant,
    });
    useLocation.mockReturnValue({
      pathname: `/${service}`,
    });
  });

  shouldMatchSnapshot(
    redirectTo ? `should redirect to ${redirectTo}` : 'should not redirect',
    <WithVariantHOC />,
  );
};

describe('WithVariant', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('service with no default variant', () => {
    testServiceVariantRedirect({
      service: 'news',
    });
  });

  describe('service (ukchina) with default variant', () => {
    testServiceVariantRedirect({
      service: 'ukchina',
      redirectTo: '/ukchina/trad',
    });
  });

  describe('service (zhongwen) with default variant', () => {
    testServiceVariantRedirect({
      service: 'zhongwen',
      redirectTo: '/zhongwen/trad',
    });
  });

  describe('service (serbian) with default variant', () => {
    testServiceVariantRedirect({
      service: 'serbian',
      redirectTo: '/serbian/lat',
    });
  });
});
