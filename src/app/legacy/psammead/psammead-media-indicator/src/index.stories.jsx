import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from '@emotion/styled';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { withServicesKnob } from '#psammead/psammead-storybook-helpers/src';
import { GEL_SPACING_HLF } from '#psammead/gel-foundations/src/spacings';
import { Headline, Link } from '#psammead/psammead-story-promo/src';
import notes from '../README.md';
import MediaIndicator from './index';

// To ensure the white box in the media indicator is visible.
const Page = styled.div`
  background: ${props => props.theme.palette.CLOUD_LIGHT};
  height: 100vh;
`;

const TimeDuration = styled.time`
  margin: 0 ${GEL_SPACING_HLF};
`;

const StyledHeadline = styled(Headline)`
  display: inline;
`;

const PageDecorator = storyFn => <Page>{storyFn()}</Page>;

storiesOf('Components/MediaIndicator/Video', module)
  .addDecorator(PageDecorator)
  .addDecorator(withKnobs)
  .addDecorator(withServicesKnob())
  .add(
    'video without duration',
    ({ script, service, dir }) => (
      <MediaIndicator
        type="video"
        script={script}
        dir={dir}
        service={service}
      />
    ),
    { notes },
  )
  .add(
    'video with duration',
    ({ script, service, dir }) => (
      <MediaIndicator type="video" script={script} service={service} dir={dir}>
        <TimeDuration dateTime={text('datetime', 'PT2M15S')}>
          {text('duration', '2:15')}
        </TimeDuration>
      </MediaIndicator>
    ),
    { notes },
  )
  .add(
    'inline video media indicator with headline',
    ({ longText: textSnippet, script, service, dir }) => (
      <>
        <MediaIndicator
          type="video"
          script={script}
          service={service}
          dir={dir}
          isInline={boolean('inline?', true)}
        />
        <StyledHeadline script={script} service={service} promoHasImage={false}>
          <Link href="https://www.bbc.co.uk/news">{textSnippet}</Link>
        </StyledHeadline>
      </>
    ),
    { notes },
  );

storiesOf('Components/MediaIndicator/Audio', module)
  .addDecorator(PageDecorator)
  .addDecorator(withKnobs)
  .addDecorator(withServicesKnob())
  .add(
    'audio without duration',
    ({ script, service, dir }) => (
      <MediaIndicator
        type="audio"
        script={script}
        service={service}
        dir={dir}
      />
    ),
    { notes },
  )
  .add(
    'audio with duration',
    ({ script, service, dir }) => (
      <MediaIndicator type="audio" script={script} service={service} dir={dir}>
        <time dateTime={text('datetime', 'PT2M15S')}>
          {text('duration', '2:15')}
        </time>
      </MediaIndicator>
    ),
    { notes },
  )
  .add(
    'inline audio media indicator with headline',
    ({ longText: textSnippet, script, service, dir }) => (
      <>
        <MediaIndicator
          type="audio"
          script={script}
          service={service}
          dir={dir}
          isInline={boolean('inline?', true)}
        />
        <StyledHeadline script={script} service={service} promoHasImage={false}>
          <Link href="https://www.bbc.co.uk/news">{textSnippet}</Link>
        </StyledHeadline>
      </>
    ),
    { notes },
  );

storiesOf('Components/MediaIndicator/Photo', module)
  .addDecorator(PageDecorator)
  .addDecorator(withKnobs)
  .addDecorator(withServicesKnob())
  .add(
    'photogallery',
    ({ script, service, dir }) => (
      <MediaIndicator
        type="photogallery"
        script={script}
        service={service}
        dir={dir}
      />
    ),
    { notes },
  )
  .add(
    'inline photogallery with headline',
    ({ longText: textSnippet, script, service, dir }) => (
      <>
        <MediaIndicator
          type="photogallery"
          script={script}
          service={service}
          dir={dir}
          isInline={boolean('inline?', true)}
        />
        <StyledHeadline script={script} service={service} promoHasImage={false}>
          <Link href="https://www.bbc.co.uk/news">{textSnippet}</Link>
        </StyledHeadline>
      </>
    ),
    { notes },
  );
