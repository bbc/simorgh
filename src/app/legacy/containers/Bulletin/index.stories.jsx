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

// eslint-disable-next-line react/prop-types
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
export const TVBulletin = (_, globalArgs) => (
  <Component {...globalArgs} item={tvFixture} />
);
export const LiveTVBulletin = (_, globalArgs) => (
  <Component {...globalArgs} item={liveTvFixture} />
);
export const RadioBulletin = (_, globalArgs) => (
  <Component {...globalArgs} item={audioFixture} />
);
export const LiveRadioBulletin = (_, globalArgs) => (
  <Component {...globalArgs} item={audioLiveFixture} />
);
export const RadioBulletinWithoutImage = (_, globalArgs) => (
  <Component {...globalArgs} item={noImageAudioFixture} />
);

// Amp
export const TVBulletinAmp = (_, globalArgs) => (
  <Component {...globalArgs} isAmp item={tvFixture} />
);
TVBulletinAmp.decorators = [ampDecorator];

export const LiveTVBulletinAmp = (_, globalArgs) => (
  <Component {...globalArgs} isAmp item={liveTvFixture} />
);
LiveTVBulletinAmp.decorators = [ampDecorator];

export const RadioBulletinAmp = (_, globalArgs) => (
  <Component {...globalArgs} isAmp item={audioFixture} />
);
RadioBulletinAmp.decorators = [ampDecorator];

export const LiveRadioBulletinAmp = (_, globalArgs) => (
  <Component {...globalArgs} isAmp item={audioLiveFixture} />
);
LiveRadioBulletinAmp.decorators = [ampDecorator];

export const RadioBulletinWithoutImageAmp = (_, globalArgs) => (
  <Component {...globalArgs} isAmp item={noImageAudioFixture} />
);
RadioBulletinWithoutImageAmp.decorators = [ampDecorator];
