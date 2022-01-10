import React from 'react';
import pathOr from 'ramda/src/pathOr';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import fixture from '#data/pidgin/frontpage';
import { ARTICLE_PAGE, MEDIA_ASSET_PAGE } from '#app/routes/utils/pageTypes';
import StoryPromoContainer from '.';
import AmpDecorator from '../../../../.storybook/helpers/ampDecorator';
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

const firstFixture = pathOr(
  null,
  ['content', 'groups', '0', 'items', '0'],
  fixture,
);

firstFixture.timestamp = Date.now();

const audioFixture = mediaFixture('audio');
const videoFixture = mediaFixture('video');
const standardPromo = promoFixture('Text');
const videoPromo = promoFixture('Video');
const featurePromo = promoFixture('Feature');
const audioPromo = promoFixture('Audio');
const galleryPromo = promoFixture('Gallery');
const podcastPromo = promoFixture('Podcast');

/* eslint-disable react/prop-types */
const Component = ({
  isAmp = false,
  item,
  promoType = 'regular',
  isSingleColumnLayout = false,
}) => (
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

export default {
  title: 'Containers/Story Promo',
  Component,
  parameters: { chromatic: { disable: true } },
};

// Canonical
export const Audio = () => <Component item={audioFixture} />;
export const Video = () => <Component item={videoFixture} />;
export const StandardLink = () => <Component item={standardPromo} />;
export const FeatureLink = () => <Component item={featurePromo} />;
export const VideoLink = () => <Component item={videoPromo} />;
export const AudioLink = () => <Component item={audioPromo} />;
export const GalleryLink = () => <Component item={galleryPromo} />;
export const PodcastLink = () => <Component item={podcastPromo} />;
export const Regular = () => <Component item={firstFixture} />;
export const RegularSingleColumn = () => (
  <Component item={firstFixture} isSingleColumnLayout />
);
export const Leading = () => (
  <Component promoType="leading" item={firstFixture} />
);
export const Top = () => <Component promoType="top" item={firstFixture} />;
export const GuidePromo = () => <Component item={guideLinkItem} />;

// Canonical
export const AudioAmp = () => <Component isAmp item={audioFixture} />;
AudioAmp.decorators = [AmpDecorator];

export const VideoAmp = () => <Component isAmp item={videoFixture} />;
VideoAmp.decorators = [AmpDecorator];

export const StandardLinkAmp = () => <Component isAmp item={standardPromo} />;
StandardLinkAmp.decorators = [AmpDecorator];

export const FeatureLinkAmp = () => <Component isAmp item={featurePromo} />;
FeatureLinkAmp.decorators = [AmpDecorator];

export const VideoLinkAmp = () => <Component isAmp item={videoPromo} />;
VideoLinkAmp.decorators = [AmpDecorator];

export const AudioLinkAmp = () => <Component isAmp item={audioPromo} />;
AudioLinkAmp.decorators = [AmpDecorator];

export const GalleryLinkAmp = () => <Component isAmp item={galleryPromo} />;
GalleryLinkAmp.decorators = [AmpDecorator];

export const PodcastLinkAmp = () => <Component isAmp item={podcastPromo} />;
PodcastLinkAmp.decorators = [AmpDecorator];

export const RegularAmp = () => <Component isAmp item={firstFixture} />;
RegularAmp.decorators = [AmpDecorator];

// Amp
export const RegularSingleColumnAmp = () => (
  <Component isAmp item={firstFixture} isSingleColumnLayout />
);
RegularSingleColumnAmp.decorators = [AmpDecorator];

export const LeadingAmp = () => (
  <Component isAmp promoType="leading" item={firstFixture} />
);
LeadingAmp.decorators = [AmpDecorator];

export const TopAmp = () => (
  <Component isAmp promoType="top" item={firstFixture} />
);
TopAmp.decorators = [AmpDecorator];

export const GuidePromoAmp = () => <Component isAmp item={guideLinkItem} />;
GuidePromoAmp.decorators = [AmpDecorator];
