import React from 'react';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import { Router, useParams, useLocation } from 'react-router-dom';
import WithVariant from '.';
import { frontPagePath } from '#app/routes/regex';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
  useLocation: jest.fn(),
}));

describe('WithVariant', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const Component = () => <h1>This is the BBC.</h1>;
  const WithVariantHOC = WithVariant(Component);

  const getMatchProps = (service, path = null) => ({
    path: path || frontPagePath,
    params: {
      service,
    },
  });

  describe('service with no default variant', () => {
    it('should not redirect', () => {
      const history = createMemoryHistory();

      const service = 'news';

      useParams.mockReturnValue({
        service,
      });
      useLocation.mockReturnValue({
        pathname: `/${service}`,
      });

      const match = getMatchProps('news');

      render(
        <Router history={history}>
          <WithVariantHOC match={match} />
        </Router>,
      );
      expect(history.location.pathname).toEqual('/');
    });
  });

  describe('service (ukchina) with default variant', () => {
    it('should redirect to */trad', () => {
      const history = createMemoryHistory();

      const service = 'ukchina';

      useParams.mockReturnValue({
        service,
      });
      useLocation.mockReturnValue({
        pathname: `/${service}`,
      });

      const match = getMatchProps('ukchina');

      render(
        <Router history={history}>
          <WithVariantHOC match={match} />
        </Router>,
      );
      expect(history.location.pathname).toEqual('/ukchina/simp');
    });
  });

  describe('service (zhongwen) with default variant', () => {
    it('should redirect to */trad', () => {
      const history = createMemoryHistory();
      const service = 'zhongwen';

      useParams.mockReturnValue({
        service,
      });
      useLocation.mockReturnValue({
        pathname: `/${service}`,
      });

      const match = getMatchProps('zhongwen');
      render(
        <Router history={history}>
          <WithVariantHOC match={match} />
        </Router>,
      );
      expect(history.location.pathname).toEqual('/zhongwen/simp');
    });
  });

  describe('service (serbian) with default variant', () => {
    it('should redirect to */lat', () => {
      const history = createMemoryHistory();

      const service = 'serbian';

      useParams.mockReturnValue({
        service,
      });
      useLocation.mockReturnValue({
        pathname: `/${service}`,
      });

      const match = getMatchProps('serbian');
      render(
        <Router history={history}>
          <WithVariantHOC match={match} />
        </Router>,
      );
      expect(history.location.pathname).toEqual('/serbian/lat');
    });
  });
});
