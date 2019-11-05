import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import { useParams, useLocation } from 'react-router-dom';
import WithVariant from '.';

jest.mock('react-router-dom', () => ({
  useParams: jest.fn(),
  useLocation: jest.fn(),
  // eslint-disable-next-line react/prop-types
  Redirect: ({ to: { pathname } }) => <p>You are going to {pathname}</p>,
}));

describe('WithVariant', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const Component = () => <h1>This is the BBC.</h1>;
  const WithVariantHOC = WithVariant(Component);

  describe('service with no default variant', () => {
    beforeEach(() => {
      const service = 'news';

      useParams.mockReturnValue({
        service,
      });
      useLocation.mockReturnValue({
        pathname: `/${service}`,
      });
    });

    shouldMatchSnapshot('should not redirect', <WithVariantHOC />);
  });

  describe('service (ukchina) with default variant', () => {
    beforeEach(() => {
      const service = 'ukchina';

      useParams.mockReturnValue({
        service,
      });
      useLocation.mockReturnValue({
        pathname: `/${service}`,
      });
    });

    shouldMatchSnapshot('should redirect to */trad', <WithVariantHOC />);
  });

  describe('service (zhongwen) with default variant', () => {
    beforeEach(() => {
      const service = 'zhongwen';

      useParams.mockReturnValue({
        service,
      });
      useLocation.mockReturnValue({
        pathname: `/${service}`,
      });
    });

    shouldMatchSnapshot('should redirect to */trad', <WithVariantHOC />);
  });

  describe('service (serbian) with default variant', () => {
    beforeEach(() => {
      const service = 'serbian';

      useParams.mockReturnValue({
        service,
      });
      useLocation.mockReturnValue({
        pathname: `/${service}`,
      });
    });

    shouldMatchSnapshot('should redirect to */lat', <WithVariantHOC />);
  });
});
