import React from 'react';
import { Router, Route } from 'react-router-dom';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import WithVariant from '.';
import { frontPagePath } from '#app/routes/utils/regex';

describe('WithVariant', () => {
  const Component = () => <h1>This is the BBC.</h1>;
  const ComponentWithVariantRedirect = WithVariant(Component);
  const getMatchProps = (service, path = null) => ({
    path: path || frontPagePath,
    params: {
      service,
    },
  });

  describe('service with no default variant', () => {
    it('should not redirect', () => {
      const service = 'news';
      const match = getMatchProps(service);
      const history = createMemoryHistory({
        initialEntries: [`/${service}`],
      });

      expect(history.location.pathname).toEqual(`/${service}`);

      render(
        <Router history={history}>
          <Route path="/:service">
            <ComponentWithVariantRedirect match={match} />
          </Route>
        </Router>,
      );

      expect(history.location.pathname).toEqual('/news');
    });
  });

  describe('service (ukchina) with default variant', () => {
    it('should redirect to ukchina/simp', () => {
      const service = 'ukchina';
      const match = getMatchProps(service);
      const history = createMemoryHistory({
        initialEntries: [`/${service}`],
      });

      expect(history.location.pathname).toEqual(`/${service}`);

      render(
        <Router history={history}>
          <Route path="/:service">
            <ComponentWithVariantRedirect match={match} />
          </Route>
        </Router>,
      );

      expect(history.location.pathname).toEqual('/ukchina/simp');
    });
  });

  describe('service (zhongwen) with default variant', () => {
    it('should redirect to zhongwen/simp', () => {
      const service = 'zhongwen';
      const match = getMatchProps(service);
      const history = createMemoryHistory({
        initialEntries: [`/${service}`],
      });

      expect(history.location.pathname).toEqual(`/${service}`);

      render(
        <Router history={history}>
          <Route path="/:service">
            <ComponentWithVariantRedirect match={match} />
          </Route>
        </Router>,
      );

      expect(history.location.pathname).toEqual('/zhongwen/simp');
    });
  });

  describe('service (serbian) with default variant', () => {
    it('should redirect to serbian/lat', () => {
      const service = 'serbian';
      const match = getMatchProps(service);
      const history = createMemoryHistory({
        initialEntries: [`/${service}`],
      });

      expect(history.location.pathname).toEqual(`/${service}`);

      render(
        <Router history={history}>
          <Route path="/:service">
            <ComponentWithVariantRedirect match={match} />
          </Route>
        </Router>,
      );

      expect(history.location.pathname).toEqual('/serbian/lat');
    });
  });
});
