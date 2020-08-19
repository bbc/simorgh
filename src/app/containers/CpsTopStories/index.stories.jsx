import React from 'react';
import { storiesOf } from '@storybook/react';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import TopStories from '.';
import topStories from '#pages/StoryPage/topStories.json';
import topStoriesRtl from '#pages/StoryPage/topStoriesRtl.json';
import AmpDecorator from '../../../../.storybook/helpers/ampDecorator';
import { RequestContextProvider } from '#contexts/RequestContext';

const getTopStories = platform => ({ service, dir, data }) => (
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
        <TopStories content={data} />
      </RequestContextProvider>
    </ServiceContextProvider>
  </div>
);

const canonicalTopStories = getTopStories('canonical');
const ampTopStories = getTopStories('amp');

storiesOf('Containers|CPS Top Stories/Canonical', module)
  .addParameters({ chromatic: { disable: true } })
  .add('igbo (ltr)', () => canonicalTopStories('igbo', 'ltr', topStories))
  .add('arabic (rtl)', () =>
    canonicalTopStories('arabic', 'rtl', topStoriesRtl),
  )
  .add('igbo (ltr) with one item', () =>
    canonicalTopStories('igbo', 'ltr', [topStories[0]]),
  )
  .add('arabic (rtl) with one item', () =>
    canonicalTopStories('arabic', 'rtl', [topStoriesRtl[0]]),
  );

storiesOf('Containers|CPS Top Stories/AMP', module)
  .addParameters({ chromatic: { disable: true } })
  .addDecorator(AmpDecorator)
  .add('igbo (ltr) - amp', () => ampTopStories('igbo', 'ltr', topStories))
  .add('arabic (rtl) - amp', () =>
    ampTopStories('arabic', 'rtl', topStoriesRtl),
  )
  .add('igbo (ltr) with one item', () =>
    canonicalTopStories('igbo', 'ltr', [topStories[0]]),
  )
  .add('arabic (rtl) with one item', () =>
    canonicalTopStories('arabic', 'rtl', [topStoriesRtl[0]]),
  );
