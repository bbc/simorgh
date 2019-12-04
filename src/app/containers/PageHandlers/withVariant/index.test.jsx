import React from 'react';
import { Router, Route } from 'react-router-dom';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { frontPagePath } from '#app/routes/regex';
import * as Cookies from '#contexts/UserContext/cookies';
import withVariant from '.';

const Component = () => <h1>This is the BBC.</h1>;
const ComponentWithVariantRedirect = withVariant(Component);

const testWithVariant = ({ service, expectedPath }) => {
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

  expect(history.location.pathname).toEqual(expectedPath);
};

describe('WithVariant', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Cookies.getPreferredVariant = jest.fn();
    Cookies.setPreferredVariant = jest.fn();
  });

  describe('service with no default variant', () => {
    it('should not redirect', () => {
      const service = 'news';
      const expectedPath = '/news';

      testWithVariant({ service, expectedPath });

      expect(Cookies.getPreferredVariant).not.toHaveBeenCalled();
      expect(Cookies.setPreferredVariant).not.toHaveBeenCalled();
    });
  });

  describe('service (ukchina) with default variant', () => {
    it('should redirect to ukchina/trad', () => {
      const service = 'ukchina';
      const expectedPath = '/ukchina/trad';

      testWithVariant({ service, expectedPath });

      expect(Cookies.getPreferredVariant).toHaveBeenCalled();
      expect(Cookies.setPreferredVariant).toHaveBeenCalledWith(service, 'trad');
    });
  });

  describe('service (ukchina) with cookie variant', () => {
    it('should redirect to ukchina/simp and set preferred variant cookie', () => {
      const service = 'ukchina';
      const expectedPath = '/ukchina/simp';
      Cookies.getPreferredVariant.mockReturnValue('simp');

      testWithVariant({ service, expectedPath });

      expect(Cookies.getPreferredVariant).toHaveBeenCalledWith(service);
      expect(Cookies.setPreferredVariant).toHaveBeenCalledWith(service, 'simp');
    });
  });

  describe('service (zhongwen) with default variant', () => {
    it('should redirect to zhongwen/trad', () => {
      const service = 'zhongwen';
      const expectedPath = '/zhongwen/trad';

      testWithVariant({ service, expectedPath });
    });
  });

  describe('service (serbian) with default variant', () => {
    it('should redirect to serbian/lat', () => {
      const service = 'serbian';
      const expectedPath = '/serbian/lat';

      testWithVariant({ service, expectedPath });
    });
  });
});
