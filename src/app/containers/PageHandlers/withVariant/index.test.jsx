import React from 'react';
import { Router, Route } from 'react-router-dom';
import Cookie from 'js-cookie';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import withVariant from '.';
import { frontPagePath } from '#app/routes/regex';

const createHistory = service =>
  createMemoryHistory({
    initialEntries: [`/${service}`],
  });
// eslint-disable-next-line react/prop-types
const TestRouter = ({ history, children }) => (
  <Router history={history}>
    <Route path={frontPagePath}>{children}</Route>
  </Router>
);
const EnhancedComponent = withVariant(() => <div />);
const deleteAllCookies = () => Object.keys(Cookie.get()).forEach(Cookie.remove);

afterEach(deleteAllCookies);

describe('service with no default variant', () => {
  it('should not redirect', () => {
    const service = 'news';
    const history = createHistory(service);

    render(
      <TestRouter history={history}>
        <EnhancedComponent />
      </TestRouter>,
    );

    expect(history.location.pathname).toEqual('/news');
    expect(Cookie.get(`ckps_${service}`)).toBeUndefined();
  });
});

describe('service (ukchina) with cookie variant', () => {
  it('should redirect to ukchina/simp and set preferred variant cookie', () => {
    const service = 'ukchina';
    const history = createHistory(service);
    Cookie.set(`ckps_${service}`, 'simp');

    render(
      <TestRouter history={history}>
        <EnhancedComponent />
      </TestRouter>,
    );

    expect(history.location.pathname).toEqual('/ukchina/simp');
    expect(Cookie.get(`ckps_${service}`)).toEqual('simp');
  });
});

describe('services with default variant', () => {
  it('should redirect to ukchina/trad', () => {
    const service = 'ukchina';
    const history = createHistory(service);

    render(
      <TestRouter history={history}>
        <EnhancedComponent />
      </TestRouter>,
    );

    expect(history.location.pathname).toEqual('/ukchina/trad');
    expect(Cookie.get(`ckps_${service}`)).toEqual('trad');
  });

  it('should redirect to zhongwen/trad', () => {
    const service = 'zhongwen';
    const history = createHistory(service);

    render(
      <TestRouter history={history}>
        <EnhancedComponent />
      </TestRouter>,
    );

    expect(history.location.pathname).toEqual('/zhongwen/trad');
  });

  it('should redirect to serbian/lat', () => {
    const service = 'serbian';
    const history = createHistory(service);

    render(
      <TestRouter history={history}>
        <EnhancedComponent />
      </TestRouter>,
    );

    expect(history.location.pathname).toEqual('/serbian/lat');
  });
});
