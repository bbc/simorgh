import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import '@testing-library/jest-dom/extend-expect';
import { RequestContext } from '#contexts/RequestContext';
import { ServiceContext } from '#contexts/ServiceContext';
import { UserContext } from '#contexts/UserContext';
import { service as serbianServiceConfig } from '#lib/config/services/serbian';
import * as cookies from '#contexts/UserContext/cookies';
import ScriptLinkContainer, { generateHref } from '.';

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
    <ScriptLinkContainerWithContext />,
  );

  describe('assertions', () => {
    let scriptLink;

    beforeEach(() => {
      const { container } = render(<ScriptLinkContainerWithContext />);
      scriptLink = container.querySelector('a[data-variant="cyr"]');
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('Script Link should contain link to other variant', () => {
      expect(scriptLink.getAttribute('href')).toBe('/serbian/cyr');
    });

    it('should set preferred variant cookie when ScriptLink is clicked', () => {
      fireEvent.click(scriptLink);
      expect(setPreferredVariantCookieSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('should generate correct href', () => {
    expect(generateHref('serbian', 'lat')).toEqual('/serbian/lat');
  });
});
