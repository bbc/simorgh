import React from 'react';
import { storiesOf } from '@storybook/react';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import CpsRelatedContent from '.';

import igboData from '#data/igbo/cpsAssets/media-23256786.json';
import arabicData from '#data/arabic/cpsAssets/media-49580542.json';
import AmpDecorator from '../../../../.storybook/helpers/ampDecorator';
import { RequestContextProvider } from '#contexts/RequestContext';

const igboRelatedContentData = igboData.relatedContent.groups[0].promos;
const arabicRelatedContentData = arabicData.relatedContent.groups[0].promos;

const getRelatedContent = platform => ({ service, dir, data }) => (
  <div dir={dir}>
    {/* The above simulates dir being added at the page level */}
    <ServiceContextProvider service={service}>
      <RequestContextProvider
        bbcOrigin="https://www.test.bbc.com"
        isAmp={platform === 'amp'}
        pageType="MAP" /* Can also be one of other CPS pagetypes */
        pathname="/"
        service={service}
      >
        <CpsRelatedContent content={data} />
      </RequestContextProvider>
    </ServiceContextProvider>
  </div>
);

const canonicalRelatedContent = getRelatedContent('canonical');
const ampRelatedContent = getRelatedContent('amp');

storiesOf('Containers|CPS Related Content/Canonical', module)
  .addParameters({ chromatic: { disable: true } })
  .add('igbo (ltr)', () =>
    canonicalRelatedContent({
      service: 'igbo',
      dir: 'ltr',
      data: igboRelatedContentData,
    }),
  )
  .add('arabic (rtl)', () =>
    canonicalRelatedContent({
      service: 'arabic',
      dir: 'rtl',
      data: arabicRelatedContentData,
    }),
  );

storiesOf('Containers|CPS Related Content/AMP', module)
  .addParameters({ chromatic: { disable: true } })
  .addDecorator(AmpDecorator)
  .add('igbo (ltr) - amp', () =>
    ampRelatedContent({
      service: 'igbo',
      dir: 'ltr',
      data: igboRelatedContentData,
    }),
  )
  .add('arabic (rtl) - amp', () =>
    ampRelatedContent({
      service: 'arabic',
      dir: 'rtl',
      data: arabicRelatedContentData,
    }),
  );
