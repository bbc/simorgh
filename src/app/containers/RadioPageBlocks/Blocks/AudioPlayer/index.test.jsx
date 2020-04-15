import React from 'react';
import {
  shouldMatchSnapshot,
  isNull,
  suppressPropWarnings,
} from '@bbc/psammead-test-helpers';
import { BrowserRouter } from 'react-router-dom';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { RequestContext } from '#contexts/RequestContext';
import AudioPlayer from '.';

const origin = 'http://localhost:7080';

describe('MediaPageBlocks AudioPlayer', () => {
  shouldMatchSnapshot(
    'should render correctly for canonical',
    <RequestContext.Provider
      value={{ platform: 'canonical', isAmp: false, origin }}
    >
      <ServiceContextProvider service="korean">
        <BrowserRouter>
          <AudioPlayer
            uuid="uuid"
            idAttr="idAttr"
            externalId="externalId"
            id="id"
          />
        </BrowserRouter>
      </ServiceContextProvider>
    </RequestContext.Provider>,
  );

  // TODO: remove the need for this suppressPropWarnings for placeholderSrc on AMP player
  suppressPropWarnings(['placeholderSrc', 'undefined']);

  shouldMatchSnapshot(
    'should render correctly for amp',
    <RequestContext.Provider value={{ platform: 'amp', isAmp: true, origin }}>
      <ServiceContextProvider service="korean">
        <BrowserRouter>
          <AudioPlayer
            uuid="uuid"
            idAttr="idAttr"
            externalId="externalId"
            id="id"
          />
        </BrowserRouter>
      </ServiceContextProvider>
    </RequestContext.Provider>,
  );

  describe('when platform is unknown', () => {
    suppressPropWarnings(['text', 'undefined']);

    isNull(
      'should render null',
      <RequestContext.Provider value={{ platform: 'foobar', origin }}>
        <ServiceContextProvider service="korean">
          <BrowserRouter>
            <AudioPlayer
              uuid="uuid"
              idAttr="idAttr"
              externalId="externalId"
              id="id"
            />
          </BrowserRouter>
        </ServiceContextProvider>
      </RequestContext.Provider>,
    );
  });

  describe('when id isnt provided', () => {
    suppressPropWarnings(['id', 'undefined']);

    isNull(
      'should render null',
      <RequestContext.Provider value={{ platform: 'foobar', origin }}>
        <ServiceContextProvider service="korean">
          <BrowserRouter>
            <AudioPlayer uuid="uuid" idAttr="idAttr" externalId="externalId" />
          </BrowserRouter>
        </ServiceContextProvider>
      </RequestContext.Provider>,
    );
  });

  describe('when externalId isnt provided', () => {
    suppressPropWarnings(['externalId', 'undefined']);

    isNull(
      'should render null',
      <RequestContext.Provider value={{ platform: 'foobar', origin }}>
        <ServiceContextProvider service="korean">
          <BrowserRouter>
            <AudioPlayer uuid="uuid" idAttr="idAttr" id="id" />
          </BrowserRouter>
        </ServiceContextProvider>
      </RequestContext.Provider>,
    );
  });

  describe('when externalId is bbc_oromo_radio it is overriden to bbc_afaanoromoo_radio', () => {
    shouldMatchSnapshot(
      'should render correctly for canonical',
      <RequestContext.Provider
        value={{ platform: 'canonical', isAmp: false, origin }}
      >
        <ServiceContextProvider service="afaanoromoo">
          <BrowserRouter>
            <AudioPlayer
              uuid="uuid"
              idAttr="idAttr"
              externalId="bbc_oromo_radio"
              id="id"
            />
          </BrowserRouter>
        </ServiceContextProvider>
      </RequestContext.Provider>,
    );

    // TODO: remove the need for this suppressPropWarnings for placeholderSrc on AMP player
    suppressPropWarnings(['placeholderSrc', 'undefined']);

    shouldMatchSnapshot(
      'should render correctly for amp',
      <RequestContext.Provider value={{ platform: 'amp', isAmp: true, origin }}>
        <ServiceContextProvider service="afaanoromoo">
          <BrowserRouter>
            <AudioPlayer
              uuid="uuid"
              idAttr="idAttr"
              externalId="bbc_oromo_radio"
              id="id"
            />
          </BrowserRouter>
        </ServiceContextProvider>
      </RequestContext.Provider>,
    );
  });
});
