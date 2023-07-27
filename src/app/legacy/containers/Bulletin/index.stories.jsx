import React from 'react';
import { withServicesKnob } from '#psammead/psammead-storybook-helpers/src';
import { withKnobs } from '@storybook/addon-knobs';
import pathOr from 'ramda/src/pathOr';
import { ServiceContextProvider } from '../../../contexts/ServiceContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import { FRONT_PAGE } from '#app/routes/utils/pageTypes';
import BulletinContainer from '.';
import ampDecorator from '../../../../../.storybook/helpers/ampDecorator';
import ThemeProvider from '../../../components/ThemeProvider';

import { tvBulletinItem, liveTvBulletinItem, radioBulletinItem, liveRadioBulletinItem} from './fixtureData';
import { dissocPath } from 'ramda';

const tvFixture = tvBulletinItem;
const audioFixture = radioBulletinItem;
const noImageAudioFixture = dissocPath(['indexImage'], radioBulletinItem);

const liveTvFixture = liveTvBulletinItem;
const audioLiveFixture = liveRadioBulletinItem;

// eslint-disable-next-line react/prop-types
const Component = ({ isAmp = false, service, item }) => (
  <ThemeProvider service={service}>
    <ServiceContextProvider service={service}>
      <RequestContextProvider
        bbcOrigin="https://www.test.bbc.co.uk"
        isAmp={isAmp}
        pathname="/pathname"
        pageType={FRONT_PAGE}
        service={service}
      >
        <BulletinContainer item={item} />
      </RequestContextProvider>
    </ServiceContextProvider>
  </ThemeProvider>
);

export default {
  Component,
  title: 'Containers/Bulletin',
  decorators: [withKnobs, withServicesKnob()],
  parameters: { chromatic: { disable: true } },
};

// Canonical
export const TVBulletin = props => <Component {...props} item={tvFixture} />;
export const LiveTVBulletin = props => (
  <Component {...props} item={liveTvFixture} />
);
export const RadioBulletin = props => (
  <Component {...props} item={audioFixture} />
);
export const LiveRadioBulletin = props => (
  <Component {...props} item={audioLiveFixture} />
);
export const RadioBulletinWithoutImage = props => (
  <Component {...props} item={noImageAudioFixture} />
);

// Amp
export const TVBulletinAmp = props => (
  <Component {...props} isAmp item={tvFixture} />
);
TVBulletinAmp.decorators = [ampDecorator];

export const LiveTVBulletinAmp = props => (
  <Component {...props} isAmp item={liveTvFixture} />
);
LiveTVBulletinAmp.decorators = [ampDecorator];

export const RadioBulletinAmp = props => (
  <Component {...props} isAmp item={audioFixture} />
);
RadioBulletinAmp.decorators = [ampDecorator];

export const LiveRadioBulletinAmp = props => (
  <Component {...props} isAmp item={audioLiveFixture} />
);
LiveRadioBulletinAmp.decorators = [ampDecorator];

export const RadioBulletinWithoutImageAmp = props => (
  <Component {...props} isAmp item={noImageAudioFixture} />
);
RadioBulletinWithoutImageAmp.decorators = [ampDecorator];
