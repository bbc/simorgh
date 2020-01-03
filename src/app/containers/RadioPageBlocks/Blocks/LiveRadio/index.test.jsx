import React from 'react';
import { suppressPropWarnings } from '@bbc/psammead-test-helpers';
import {
  renderWithRouter,
  assertFirstChildIsNull,
} from '#lib/utilities/testHelpers';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { RequestContext } from '#contexts/RequestContext';
import LiveRadio from '.';

const origin = 'http://localhost:7080';

describe('MediaPageBlocks LiveRadio', () => {
  beforeEach(() => {
    process.env.SIMORGH_EMBEDS_BASE_URL_TEST = 'https://embed-host.bbc.com';
  });

  it('should render correctly for canonical', () => {
    const { asFragment } = renderWithRouter(
      <RequestContext.Provider value={{ platform: 'canonical', origin }}>
        <ServiceContextProvider service="korean">
          <LiveRadio
            uuid="uuid"
            idAttr="idAttr"
            externalId="externalId"
            id="id"
          />
        </ServiceContextProvider>
      </RequestContext.Provider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  // TODO: remove the need for this suppressPropWarnings for placeholderSrc on AMP player
  suppressPropWarnings(['placeholderSrc', 'undefined']);

  it('should render correctly for amp', () => {
    const { asFragment } = renderWithRouter(
      <RequestContext.Provider value={{ platform: 'amp', origin }}>
        <ServiceContextProvider service="korean">
          <LiveRadio
            uuid="uuid"
            idAttr="idAttr"
            externalId="externalId"
            id="id"
          />
        </ServiceContextProvider>
      </RequestContext.Provider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  describe('when platform is unknown', () => {
    suppressPropWarnings(['text', 'undefined']);

    it('should render null', () => {
      const { container } = renderWithRouter(
        <RequestContext.Provider value={{ platform: 'foobar', origin }}>
          <ServiceContextProvider service="korean">
            <LiveRadio
              uuid="uuid"
              idAttr="idAttr"
              externalId="externalId"
              id="id"
            />
          </ServiceContextProvider>
        </RequestContext.Provider>,
      );
      assertFirstChildIsNull(container);
    });
  });

  describe('when id isnt provided', () => {
    suppressPropWarnings(['id', 'undefined']);

    it('should render null', () => {
      const { container } = renderWithRouter(
        <RequestContext.Provider value={{ platform: 'foobar', origin }}>
          <ServiceContextProvider service="korean">
            <LiveRadio uuid="uuid" idAttr="idAttr" externalId="externalId" />
          </ServiceContextProvider>
        </RequestContext.Provider>,
      );
      assertFirstChildIsNull(container);
    });
  });

  describe('when externalId isnt provided', () => {
    suppressPropWarnings(['externalId', 'undefined']);

    it('should render null', () => {
      const { container } = renderWithRouter(
        <RequestContext.Provider value={{ platform: 'foobar', origin }}>
          <ServiceContextProvider service="korean">
            <LiveRadio uuid="uuid" idAttr="idAttr" id="id" />
          </ServiceContextProvider>
        </RequestContext.Provider>,
      );
      assertFirstChildIsNull(container);
    });
  });

  describe('when externalId is bbc_oromo_radio it is overriden to bbc_afaanoromoo_radio', () => {
    it('should render correctly for canonical', () => {
      const { asFragment } = renderWithRouter(
        <RequestContext.Provider value={{ platform: 'canonical', origin }}>
          <ServiceContextProvider service="afaanoromoo">
            <LiveRadio
              uuid="uuid"
              idAttr="idAttr"
              externalId="bbc_oromo_radio"
              id="id"
            />
          </ServiceContextProvider>
        </RequestContext.Provider>,
      );
      expect(asFragment()).toMatchSnapshot();
    });

    // TODO: remove the need for this suppressPropWarnings for placeholderSrc on AMP player
    suppressPropWarnings(['placeholderSrc', 'undefined']);

    it('should render correctly for amp', () => {
      const { asFragment } = renderWithRouter(
        <RequestContext.Provider value={{ platform: 'amp', origin }}>
          <ServiceContextProvider service="afaanoromoo">
            <LiveRadio
              uuid="uuid"
              idAttr="idAttr"
              externalId="bbc_oromo_radio"
              id="id"
            />
          </ServiceContextProvider>
        </RequestContext.Provider>,
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
