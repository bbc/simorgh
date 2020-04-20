import React from 'react';
import { storiesOf } from '@storybook/react';
import { withServicesKnob } from '@bbc/psammead-storybook-helpers';
import { withKnobs } from '@storybook/addon-knobs';
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

const noImageBulletinFixture = type =>
  pathOr(null, ['content', 'groups'], fixture)
    .flatMap(group => pathOr(null, ['items'], group))
    .find(
      item =>
        pathOr(null, ['assetTypeCode'], item) === 'PRO' &&
        pathOr(null, ['contentType'], item) === type &&
        !pathOr(null, ['indexImage'], item),
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
const noImageAudioFixture = noImageBulletinFixture('RadioBulletin');

const liveTvFixture = liveBulletinFixture('TVBulletin');
const audioLiveFixture = liveBulletinFixture('RadioBulletin');

const getBulletinPromo = (platform, service, item) => (
  <ServiceContextProvider service={service}>
    <RequestContextProvider
      bbcOrigin="https://www.test.bbc.co.uk"
      isAmp={platform === 'amp'}
      pathname="/pathname"
      pageType="frontPage"
      service={service}
    >
      <BulletinContainer item={item} />
    </RequestContextProvider>
  </ServiceContextProvider>
);

const getCanonicalBulletin = (service, item) =>
  getBulletinPromo('canonical', service, item);

const getAmpBulletin = (service, item) =>
  getBulletinPromo('amp', service, item);

storiesOf('Containers|Bulletin/Canonical', module)
  .addParameters({ chromatic: { disable: true } })
  .addDecorator(withKnobs)
  .addDecorator(withServicesKnob())
  .add('TV Bulletin', ({ service }) => getCanonicalBulletin(service, tvFixture))
  .add('TV Bulletin - Live', ({ service }) =>
    getCanonicalBulletin(service, liveTvFixture),
  )
  .add('Radio Bulletin', ({ service }) =>
    getCanonicalBulletin(service, audioFixture),
  )
  .add('No Image Radio Bulletin', ({ service }) =>
    getCanonicalBulletin(service, noImageAudioFixture),
  )
  .add('Radio Bulletin - Live', ({ service }) =>
    getCanonicalBulletin(service, audioLiveFixture),
  );

storiesOf('Containers|Bulletin/AMP', module)
  .addParameters({ chromatic: { disable: true } })
  .addDecorator(AmpDecorator)
  .addDecorator(withKnobs)
  .addDecorator(withServicesKnob())
  .add('TV Bulletin', ({ service }) => getAmpBulletin(service, tvFixture))
  .add('TV Bulletin - Live', ({ service }) =>
    getAmpBulletin(service, liveTvFixture),
  )
  .add('Radio Bulletin', ({ service }) => getAmpBulletin(service, audioFixture))
  .add('No Image Radio Bulletin', ({ service }) =>
    getAmpBulletin(service, noImageAudioFixture),
  )
  .add('Radio Bulletin - Live', ({ service }) =>
    getAmpBulletin(service, audioLiveFixture),
  );
