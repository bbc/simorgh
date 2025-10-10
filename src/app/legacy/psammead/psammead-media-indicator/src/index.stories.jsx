import React from 'react';
import { storiesOf } from '@storybook/react-webpack5';
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
    ({ dir }) => <MediaIndicator type="video" dir={dir} />,
    { notes },
  )
  .add(
    'video with duration',
    ({ dir }) => (
      <MediaIndicator type="video" dir={dir}>
        <TimeDuration dateTime={text('datetime', 'PT2M15S')}>
          {text('duration', '2:15')}
        </TimeDuration>
      </MediaIndicator>
    ),
    { notes },
  )
  .add(
    'inline video media indicator with headline',
    ({ longText: textSnippet, dir }) => (
      <>
        <MediaIndicator
          type="video"
          dir={dir}
          isInline={boolean('inline?', true)}
        />
        <StyledHeadline promoHasImage={false}>
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
    ({ dir }) => <MediaIndicator type="audio" dir={dir} />,
    { notes },
  )
  .add(
    'audio with duration',
    ({ dir }) => (
      <MediaIndicator type="audio" dir={dir}>
        <time dateTime={text('datetime', 'PT2M15S')}>
          {text('duration', '2:15')}
        </time>
      </MediaIndicator>
    ),
    { notes },
  )
  .add(
    'inline audio media indicator with headline',
    ({ longText: textSnippet, dir }) => (
      <>
        <MediaIndicator
          type="audio"
          dir={dir}
          isInline={boolean('inline?', true)}
        />
        <StyledHeadline promoHasImage={false}>
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
    ({ dir }) => <MediaIndicator type="photogallery" dir={dir} />,
    { notes },
  )
  .add(
    'inline photogallery with headline',
    ({ longText: textSnippet, dir }) => (
      <>
        <MediaIndicator
          type="photogallery"
          dir={dir}
          isInline={boolean('inline?', true)}
        />
        <StyledHeadline promoHasImage={false}>
          <Link href="https://www.bbc.co.uk/news">{textSnippet}</Link>
        </StyledHeadline>
      </>
    ),
    { notes },
  );
