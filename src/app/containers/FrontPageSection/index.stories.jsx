import React from 'react';
import pathOr from 'ramda/src/pathOr';
import { storiesOf } from '@storybook/react';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import FrontPageSection from '.';

import igboData from '#data/igbo/frontpage/index.json';
import pidginData from '#data/pidgin/frontpage/index.json';
import russianData from '#data/russian/frontpage/index.json';
import AmpDecorator from '../../../../.storybook/helpers/ampDecorator';
import { RequestContextProvider } from '#contexts/RequestContext';

const getSection = platform => (service, data) => (
  <ServiceContextProvider service={service}>
    <RequestContextProvider
      bbcOrigin="https://www.test.bbc.com"
      isAmp={platform === 'amp'}
      pageType="frontPage"
      service={service}
    >
      <FrontPageSection group={data} sectionNumber={1} />
    </RequestContextProvider>
  </ServiceContextProvider>
);

const getCanonicalSection = getSection('canonical');
const getAmpSection = getSection('amp');

storiesOf('Containers|Front Page Section/Canonical', module)
  .addParameters({ chromatic: { disable: true } })
  .add('igbo', () => getCanonicalSection('igbo', igboData.content.groups[0]))
  .add('pidgin', () =>
    getCanonicalSection('pidgin', pidginData.content.groups[0]),
  )
  .add('link to more', () =>
    getCanonicalSection(
      'pidgin',
      pidginData.content.groups.find(
        sec => pathOr(null, ['strapline', 'type'], sec) === 'LINK',
      ),
    ),
  )
  .add('useful links', () =>
    getCanonicalSection(
      'igbo',
      russianData.content.groups.find(
        sec => pathOr(null, ['semanticGroupName'], sec) === 'Useful links',
      ),
    ),
  );

storiesOf('Containers|Front Page Section/AMP', module)
  .addParameters({ chromatic: { disable: true } })
  .addDecorator(AmpDecorator)
  .add('igbo - amp', () => getAmpSection('igbo', igboData.content.groups[0]))
  .add('pidgin - amp', () =>
    getAmpSection('pidgin', pidginData.content.groups[0]),
  )
  .add('link to more - amp', () =>
    getAmpSection(
      'pidgin',
      pidginData.content.groups.find(
        sec => pathOr(null, ['strapline', 'type'], sec) === 'LINK',
      ),
    ),
  )
  .add('useful links - amp', () =>
    getAmpSection(
      'igbo',
      russianData.content.groups.find(
        sec => pathOr(null, ['semanticGroupName'], sec) === 'Useful links',
      ),
    ),
  );
