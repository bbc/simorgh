import React from 'react';
import {
  shouldMatchSnapshot,
  isNull,
  suppressPropWarnings,
} from '@bbc/psammead-test-helpers';
import { BrowserRouter } from 'react-router-dom';
import omit from 'ramda/src/omit';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { RequestContext } from '#contexts/RequestContext';
import AudioPlayer from '.';

const origin = 'http://localhost:7080';

const defaultAudioPlayerProps = {
  uuid: 'uuid',
  idAttr: 'idAttr',
  externalId: 'externalId',
  id: 'id',
  promoBrandTitle: 'ماښامنۍ خپرونه',
  shortSynopsis: 'د بي بي سي ورلډ سروس څخه پروګرام کول',
  durationISO8601: 'PT29M30S',
  imageUrl: 'https://ichef.bbci.co.uk/images/ic/1024x576/p063j1dv.jpg',
  releaseDateTimeStamp: 1587655800000,
};

const defaultRequestContextValue = { platform: 'foobar', origin };

/* eslint-disable react/prop-types */
const renderComponent = ({
  audioPlayerProps = defaultAudioPlayerProps,
  requestContextValue = defaultRequestContextValue,
  service = 'korean',
}) => (
  <RequestContext.Provider value={requestContextValue}>
    <ServiceContextProvider service={service}>
      <BrowserRouter>
        <AudioPlayer {...audioPlayerProps} />
      </BrowserRouter>
    </ServiceContextProvider>
  </RequestContext.Provider>
);
/* eslint-enable react/prop-types */

describe('MediaPageBlocks AudioPlayer', () => {
  shouldMatchSnapshot(
    'should render correctly for canonical',
    renderComponent({
      requestContextValue: { platform: 'canonical', isAmp: false, origin },
    }),
  );

  // TODO: remove the need for this suppressPropWarnings for placeholderSrc on AMP player
  suppressPropWarnings(['placeholderSrc', 'undefined']);

  shouldMatchSnapshot(
    'should render correctly for amp',
    renderComponent({
      requestContextValue: { platform: 'amp', isAmp: true, origin },
    }),
  );

  describe('when platform is unknown', () => {
    suppressPropWarnings(['text', 'undefined']);

    isNull('should render null', renderComponent({}));
  });

  describe('when id isnt provided', () => {
    suppressPropWarnings(['id', 'undefined']);

    isNull(
      'should render null',
      renderComponent({
        audioPlayerProps: omit(['id'], defaultAudioPlayerProps),
      }),
    );
  });

  describe('when externalId isnt provided', () => {
    suppressPropWarnings(['externalId', 'undefined']);

    isNull(
      'should render null',
      renderComponent({
        audioPlayerProps: omit(['externalId'], defaultAudioPlayerProps),
      }),
    );
  });

  describe('when externalId is bbc_oromo_radio it is overriden to bbc_afaanoromoo_radio', () => {
    const service = 'afaanoromoo';
    const audioPlayerProps = {
      ...defaultAudioPlayerProps,
      externalId: 'bbc_oromo_radio',
    };

    shouldMatchSnapshot(
      'should render correctly for canonical',
      renderComponent({
        service,
        requestContextValue: { platform: 'canonical', isAmp: false, origin },
        audioPlayerProps,
      }),
    );

    // TODO: remove the need for this suppressPropWarnings for placeholderSrc on AMP player
    suppressPropWarnings(['placeholderSrc', 'undefined']);

    shouldMatchSnapshot(
      'should render correctly for amp',
      renderComponent({
        service,
        requestContextValue: { platform: 'amp', isAmp: true, origin },
        audioPlayerProps,
      }),
    );
  });
});
