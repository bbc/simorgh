import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import { useParams, useLocation } from 'react-router-dom';
import WithVariant from '.';
import { frontpageRegexPath } from '#app/routes/regex';

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

  const getMatchProps = (service, path = null) => ({
    path: path || frontpageRegexPath,
    params: {
      service,
    },
  });

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

    const match = getMatchProps('news');

    shouldMatchSnapshot(
      'should not redirect',
      <WithVariantHOC match={match} />,
    );
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

    const match = getMatchProps('ukchina');

    shouldMatchSnapshot(
      'should redirect to */trad',
      <WithVariantHOC match={match} />,
    );
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

    const match = getMatchProps('zhongwen');

    shouldMatchSnapshot(
      'should redirect to */trad',
      <WithVariantHOC match={match} />,
    );
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

    const match = getMatchProps('serbian');

    shouldMatchSnapshot(
      'should redirect to */lat',
      <WithVariantHOC match={match} />,
    );
  });
});
