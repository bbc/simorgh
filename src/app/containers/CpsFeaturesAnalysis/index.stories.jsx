import React from 'react';
import { storiesOf } from '@storybook/react';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import FeaturesAnalysis from '.';
import features from '#pages/StoryPage/featuresAnalysis.json';
import featuresRtl from '#pages/StoryPage/featuresAnalysisRtl.json';
import AmpDecorator from '../../../../.storybook/helpers/ampDecorator';
import { RequestContextProvider } from '#contexts/RequestContext';

const getFeaturesAnalysis = platform => ({ service, dir, data }) => (
  <div dir={dir}>
    {/* The above simulates dir being added at the page level */}
    <ServiceContextProvider service={service}>
      <RequestContextProvider
        bbcOrigin="https://www.test.bbc.com"
        isAmp={platform === 'amp'}
        pageType="STY"
        pathname="/"
        service={service}
      >
        <FeaturesAnalysis content={data} />
      </RequestContextProvider>
    </ServiceContextProvider>
  </div>
);

const canonicalFeaturesAnalysis = getFeaturesAnalysis('canonical');
const ampFeaturesAnalysis = getFeaturesAnalysis('amp');

storiesOf('Containers|CPS Features & Analysis/Canonical', module)
  .addParameters({ chromatic: { disable: true } })
  .add('igbo (ltr)', () =>
    canonicalFeaturesAnalysis({
      service: 'igbo',
      dir: 'ltr',
      data: features,
    }),
  )
  .add('arabic (rtl)', () =>
    canonicalFeaturesAnalysis({
      service: 'arabic',
      dir: 'rtl',
      data: featuresRtl,
    }),
  )
  .add('igbo (ltr) with one item', () =>
    canonicalFeaturesAnalysis({
      service: 'igbo',
      dir: 'ltr',
      data: [features[0]],
    }),
  )
  .add('arabic (rtl) with one item', () =>
    canonicalFeaturesAnalysis({
      service: 'arabic',
      dir: 'rtl',
      data: [featuresRtl[0]],
    }),
  );

storiesOf('Containers|CPS Features & Analysis/AMP', module)
  .addParameters({ chromatic: { disable: true } })
  .addDecorator(AmpDecorator)
  .add('igbo (ltr) - amp', () =>
    ampFeaturesAnalysis({
      service: 'igbo',
      dir: 'ltr',
      data: features,
    }),
  )
  .add('arabic (rtl) - amp', () =>
    ampFeaturesAnalysis({
      service: 'arabic',
      dir: 'rtl',
      data: featuresRtl,
    }),
  )
  .add('igbo (ltr) with one item', () =>
    canonicalFeaturesAnalysis({
      service: 'igbo',
      dir: 'ltr',
      data: [features[0]],
    }),
  )
  .add('arabic (rtl) with one item', () =>
    canonicalFeaturesAnalysis({
      service: 'arabic',
      dir: 'rtl',
      data: [featuresRtl[0]],
    }),
  );
