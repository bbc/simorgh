import React from 'react';
import { Router, Route } from 'react-router-dom';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import WithVariant from '.';
import { frontPagePath } from '#app/routes/regex';

describe('WithVariant', () => {
  const Component = () => <h1>This is the BBC.</h1>;
  const ComponentWithVariantRedirect = WithVariant(Component);

  describe('service with no default variant', () => {
    it('should not redirect', () => {
      const service = 'news';
      const history = createMemoryHistory({
        initialEntries: [`/${service}`],
      });

      expect(history.location.pathname).toEqual(`/${service}`);

      render(
        <Router history={history}>
          <Route path={frontPagePath}>
            <ComponentWithVariantRedirect />
          </Route>
        </Router>,
      );

      expect(history.location.pathname).toEqual('/news');
    });
  });

  describe('service (ukchina) with default variant', () => {
    it('should redirect to ukchina/trad', () => {
      const service = 'ukchina';
      const history = createMemoryHistory({
        initialEntries: [`/${service}`],
      });

      expect(history.location.pathname).toEqual(`/${service}`);

      render(
        <Router history={history}>
          <Route path={frontPagePath}>
            <ComponentWithVariantRedirect />
          </Route>
        </Router>,
      );

      expect(history.location.pathname).toEqual('/ukchina/trad');
    });
  });

  describe('service (zhongwen) with default variant', () => {
    it('should redirect to zhongwen/trad', () => {
      const service = 'zhongwen';
      const history = createMemoryHistory({
        initialEntries: [`/${service}`],
      });

      expect(history.location.pathname).toEqual(`/${service}`);

      render(
        <Router history={history}>
          <Route path={frontPagePath}>
            <ComponentWithVariantRedirect />
          </Route>
        </Router>,
      );

      expect(history.location.pathname).toEqual('/zhongwen/trad');
    });
  });

  describe('service (serbian) with default variant', () => {
    it('should redirect to serbian/lat', () => {
      const service = 'serbian';
      const history = createMemoryHistory({
        initialEntries: [`/${service}`],
      });

      expect(history.location.pathname).toEqual(`/${service}`);

      render(
        <Router history={history}>
          <Route path={frontPagePath}>
            <ComponentWithVariantRedirect />
          </Route>
        </Router>,
      );

      expect(history.location.pathname).toEqual('/serbian/lat');
    });
  });
});
