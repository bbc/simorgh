import React from 'react';
import pathOr from 'ramda/src/pathOr';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import { ARTICLE_PAGE, MEDIA_ASSET_PAGE } from '#app/routes/utils/pageTypes';
import { ServiceContextProvider } from '../../../contexts/ServiceContext';
import fixture from './helpers/storiesFixture';
import StoryPromoContainer from '.';
import AmpDecorator from '../../../../../.storybook/helpers/ampDecorator';
import { guideLinkItem } from './helpers/fixtureData';

const mediaFixture = type =>
  pathOr(null, ['content', 'groups'], fixture)
    .flatMap(group => pathOr(null, ['items'], group))
    .find(
      item =>
        pathOr(null, ['cpsType'], item) === MEDIA_ASSET_PAGE &&
        pathOr(null, ['media', 'format'], item) === type,
    );

const promoFixture = type =>
  pathOr(null, ['content', 'groups'], fixture)
    .flatMap(group => pathOr(null, ['items'], group))
    .find(
      item =>
        pathOr(null, ['assetTypeCode'], item) === 'PRO' &&
        pathOr(null, ['contentType'], item) === type,
    );

const promoTypes = {
  audioFixture: mediaFixture('audio'),
  videoFixture: mediaFixture('video'),
  standardPromo: promoFixture('Text'),
  featurePromo: promoFixture('Feature'),
  videoPromo: promoFixture('Video'),
  audioPromo: promoFixture('Audio'),
  galleryPromo: promoFixture('Gallery'),
  podcastPromo: promoFixture('Podcast'),
  guideLinkItem,
};

const Component = ({
  isAmp = false,
  item = promoTypes.audioFixture,
  promoType = 'regular',
  isSingleColumnLayout = false,
}) => {
  return (
    <ServiceContextProvider service="news">
      <RequestContextProvider
        bbcOrigin="https://www.test.bbc.co.uk"
        id="c0000000000o"
        isAmp={isAmp}
        pathname="/pathname"
        pageType={ARTICLE_PAGE}
        service="news"
      >
        <ToggleContextProvider
          toggles={{
            eventTracking: { enabled: false },
          }}
        >
          <StoryPromoContainer
            item={item}
            promoType={promoType}
            isSingleColumnLayout={isSingleColumnLayout}
          />
        </ToggleContextProvider>
      </RequestContextProvider>
    </ServiceContextProvider>
  );
};

export default {
  title: 'Containers/Story Promo',
  Component,
  parameters: { chromatic: { disable: true } },
  args: {
    type: 'audioFixture',
    promoType: 'regular',
    isSingleColumnLayout: false,
  },
  argTypes: {
    type: {
      options: [
        'audioFixture',
        'videoFixture',
        'standardPromo',
        'featurePromo',
        'videoPromo',
        'audioPromo',
        'galleryPromo',
        'podcastPromo',
        'guideLinkItem',
      ],
      control: { type: 'select' },
    },
    promoType: {
      options: ['regular', 'leading', 'top'],
      control: { type: 'select' },
    },
    isSingleColumnLayout: {
      control: { type: 'boolean' },
    },
  },
};

// Canonical
export const Promo = ({ type, promoType, isSingleColumnLayout }) => {
  return (
    <Component
      item={promoTypes[type]}
      promoType={promoType}
      isAmp={false}
      isSingleColumnLayout={isSingleColumnLayout}
    />
  );
};

// Amp
export const PromoAmp = ({ type, promoType, isSingleColumnLayout }) => {
  return (
    <Component
      item={promoTypes[type]}
      promoType={promoType}
      isAmp
      isSingleColumnLayout={isSingleColumnLayout}
    />
  );
};
PromoAmp.decorators = [AmpDecorator];
