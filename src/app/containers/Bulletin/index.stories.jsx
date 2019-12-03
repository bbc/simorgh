import React from 'react';
import { storiesOf } from '@storybook/react';
import pathOr from 'ramda/src/pathOr';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import BulletinContainer from '.';
import fixture from '#data/igbo/frontpage';
import AmpDecorator from '../../../../.storybook/helpers/ampDecorator';

const bulletinFixture = type =>
  pathOr(null, ['content', 'groups'], fixture)
    .flatMap(group => pathOr(null, ['items'], group))
    .find(
      item =>
        pathOr(null, ['assetTypeCode'], item) === 'PRO' &&
        pathOr(null, ['contentType'], item) === type &&
        !pathOr(null, ['isLive'], item),
    );

const liveBulletinFixture = type =>
  pathOr(null, ['content', 'groups'], fixture)
    .flatMap(group => pathOr(null, ['items'], group))
    .find(
      item =>
        pathOr(null, ['assetTypeCode'], item) === 'PRO' &&
        pathOr(null, ['contentType'], item) === type &&
        pathOr(null, ['isLive'], item) === true,
    );

const tvFixture = bulletinFixture('TVBulletin');
const audioFixture = bulletinFixture('RadioBulletin');

const liveTvFixture = liveBulletinFixture('TVBulletin');
const audioLiveFixture = liveBulletinFixture('RadioBulletin');

const getBulletinPromo = platform => item => (
  <ServiceContextProvider service="news">
    <RequestContextProvider
      bbcOrigin="https://www.test.bbc.co.uk"
      isAmp={platform === 'amp'}
      pageType="frontPage"
      service="news"
    >
      <BulletinContainer item={item} />
    </RequestContextProvider>
  </ServiceContextProvider>
);

const getCanonicalBulletin = getBulletinPromo('canonical');
const getAmpBulletin = getBulletinPromo('amp');

storiesOf('Containers|Bulletin/Canonical', module)
  .addParameters({ chromatic: { disable: true } })
  .add('TV Bulletin', () => getCanonicalBulletin(tvFixture))
  .add('TV Bulletin - Live', () => getCanonicalBulletin(liveTvFixture))
  .add('Radio Bulletin', () => getCanonicalBulletin(audioFixture))
  .add('Radio Bulletin - Live', () => getCanonicalBulletin(audioLiveFixture));

storiesOf('Containers|Bulletin/AMP', module)
  .addParameters({ chromatic: { disable: true } })
  .addDecorator(AmpDecorator)
  .add('TV Bulletin', () => getAmpBulletin(tvFixture))
  .add('TV Bulletin - Live', () => getAmpBulletin(liveTvFixture))
  .add('Radio Bulletin', () => getAmpBulletin(audioFixture))
  .add('Radio Bulletin - Live', () => getAmpBulletin(audioLiveFixture));
