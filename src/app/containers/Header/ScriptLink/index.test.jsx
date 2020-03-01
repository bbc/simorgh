import React from 'react';
import { node } from 'prop-types';
import { MemoryRouter, Route } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import '@testing-library/jest-dom/extend-expect';
import { RequestContext } from '#contexts/RequestContext';
import { ServiceContext } from '#contexts/ServiceContext';
import { UserContext } from '#contexts/UserContext';
import { service as serbianServiceConfig } from '#lib/config/services/serbian';
import * as cookies from '#contexts/UserContext/cookies';
import ScriptLinkContainer, { getVariantHref } from '.';
import {
  // articlePath,
  // cpsAssetPagePath,
  // errorPagePath,
  frontPagePath,
  // legacyAssetPagePath,
  // radioAndTvPath,
} from '#app/routes/utils/regex';

const setPreferredVariantCookieSpy = jest.spyOn(
  cookies,
  'setPreferredVariantCookie',
);

const userContextMock = {
  setPreferredVariantCookie: cookies.setPreferredVariantCookie,
};

const requestContextMock = {
  variant: 'lat',
};

const withRouter = (
  component,
  matchPath = frontPagePath,
  path = '/serbian/lat',
) => {
  const Wrapper = ({ children }) => (
    <MemoryRouter initialEntries={[path]}>
      <Route path={matchPath}>{children}</Route>
    </MemoryRouter>
  );

  Wrapper.propTypes = {
    children: node.isRequired,
  };

  return {
    ...render(component, { wrapper: Wrapper }),
  };
};

/* eslint-disable react/prop-types */
const ScriptLinkContainerWithContext = () => (
  <ServiceContext.Provider value={serbianServiceConfig.lat}>
    <UserContext.Provider value={userContextMock}>
      <RequestContext.Provider value={requestContextMock}>
        <ScriptLinkContainer />
      </RequestContext.Provider>
    </UserContext.Provider>
  </ServiceContext.Provider>
);

describe(`Script Link`, () => {
  shouldMatchSnapshot(
    'should render correctly',
    <MemoryRouter initialEntries={['/serbian/lat']}>
      <Route path={frontPagePath}>
        <ScriptLinkContainerWithContext />
      </Route>
    </MemoryRouter>,
  );

  describe('assertions', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('Script Link should contain link to other variant', () => {
      const { container } = withRouter(<ScriptLinkContainerWithContext />);
      const scriptLink = container.querySelector('a[data-variant="cyr"]');
      expect(scriptLink.getAttribute('href')).toBe('/serbian/cyr');
    });

    it('Script Link should contain link to other variant', () => {
      const { container } = withRouter(<ScriptLinkContainerWithContext />);
      const scriptLink = container.querySelector('a[data-variant="cyr"]');
      expect(scriptLink.getAttribute('href')).toBe('/serbian/cyr');
    });

    // write a test to cover other than just front pages

    it('should set preferred variant cookie when ScriptLink is clicked', () => {
      const { container } = withRouter(<ScriptLinkContainerWithContext />);
      const scriptLink = container.querySelector('a[data-variant="cyr"]');
      fireEvent.click(scriptLink);
      expect(setPreferredVariantCookieSpy).toHaveBeenCalledTimes(1);
    });
  });

  // write a test to cover other than just front pages

  it('should generate correct variant URL', () => {
    expect(
      getVariantHref({
        path: frontPagePath,
        params: { service: 'serbian', variant: '/lat' },
        variant: 'cyr',
      }),
    ).toEqual('/serbian/cyr');
  });
});
