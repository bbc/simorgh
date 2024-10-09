import React from 'react';
import { RequestContextProvider } from '#contexts/RequestContext';
import { FRONT_PAGE } from '#app/routes/utils/pageTypes';
import BulletinContainer from '.';
import ampDecorator from '../../../../../.storybook/helpers/ampDecorator';
import {
  tvBulletinItem,
  liveTvBulletinItem,
  radioBulletinItem,
  liveRadioBulletinItem,
} from './fixtureData';
import { dissocPath } from 'ramda';

const tvFixture = tvBulletinItem;
const audioFixture = radioBulletinItem;
const noImageAudioFixture = dissocPath(['indexImage'], radioBulletinItem);

const liveTvFixture = liveTvBulletinItem;
const audioLiveFixture = liveRadioBulletinItem;

const Component = ({ isAmp = false, service, item }) => (
  <RequestContextProvider
    bbcOrigin="https://www.test.bbc.co.uk"
    isAmp={isAmp}
    pathname="/pathname"
    pageType={FRONT_PAGE}
    service={service}
  >
    <BulletinContainer item={item} />
  </RequestContextProvider>
);

export default {
  Component,
  title: 'Containers/Bulletin',
  parameters: { chromatic: { disable: true } },
};

// Canonical
export const TVBulletin = (_, { service }) => (
  <Component service={service} item={tvFixture} />
);
export const LiveTVBulletin = (_, { service }) => (
  <Component service={service} item={liveTvFixture} />
);
export const RadioBulletin = (_, { service }) => (
  <Component service={service} item={audioFixture} />
);
export const LiveRadioBulletin = (_, { service }) => (
  <Component service={service} item={audioLiveFixture} />
);
export const RadioBulletinWithoutImage = (_, { service }) => (
  <Component service={service} item={noImageAudioFixture} />
);

// Amp
export const TVBulletinAmp = (_, { service }) => (
  <Component service={service} isAmp item={tvFixture} />
);
TVBulletinAmp.decorators = [ampDecorator];

export const LiveTVBulletinAmp = (_, { service }) => (
  <Component service={service} isAmp item={liveTvFixture} />
);
LiveTVBulletinAmp.decorators = [ampDecorator];

export const RadioBulletinAmp = (_, { service }) => (
  <Component service={service} isAmp item={audioFixture} />
);
RadioBulletinAmp.decorators = [ampDecorator];

export const LiveRadioBulletinAmp = (_, { service }) => (
  <Component service={service} isAmp item={audioLiveFixture} />
);
LiveRadioBulletinAmp.decorators = [ampDecorator];

export const RadioBulletinWithoutImageAmp = (_, { service }) => (
  <Component service={service} isAmp item={noImageAudioFixture} />
);
RadioBulletinWithoutImageAmp.decorators = [ampDecorator];
