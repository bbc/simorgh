import React from 'react';
import { storiesOf } from '@storybook/react-webpack5';
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs';
import Image from '#psammead/psammead-image/src';
import MediaIndicator from '#psammead/psammead-media-indicator/src';
import LiveLabel from '#psammead/psammead-live-label/src';
import VisuallyHiddenText from '../../../../components/VisuallyHiddenText';
import { withServicesKnob } from '#psammead/psammead-storybook-helpers/src';
import Grid from '#psammead/psammead-grid/src';
import styled from '@emotion/styled';
import { GEL_SPACING_HLF } from '#psammead/gel-foundations/src/spacings';
import StoryPromo, { Headline, Summary, Link } from './index';
import relatedItems from '../testHelpers/relatedItems';
import IndexAlsosContainer from '../testHelpers/IndexAlsosContainer';
import notes from '../README.md';

const buildImg = () => {
  const imageSizes = [300, 450, 600, 1024];
  const imageSrc =
    'https://ichef.bbci.co.uk/ace/ws/[WIDTH]/cpsprodpb/11897/production/_106613817_999_al_.jpg';

  return (
    <Image
      alt={text('Image alt text', 'Robert Downey Junior in Iron Man')}
      src={text('Image src', imageSrc.replace('[WIDTH]', 660))}
      width="640"
      srcset={imageSizes
        .map(size => `${imageSrc.replace('[WIDTH]', size)}.webp ${size}w`)
        .join(', ')}
      fallbackSrcset={imageSizes
        .map(size => `${imageSrc.replace('[WIDTH]', size)} ${size}w`)
        .join(', ')}
      primaryMimeType="image/webp"
      fallbackMimeType="image/jpeg"
    />
  );
};

const StyledTime = styled.time`
  padding: 0 ${GEL_SPACING_HLF};
`;

const MediaIndicatorComponent = ({ type, dir, mediaIndicatorIsInline }) => {
  return (
    <MediaIndicator type={type} dir={dir} isInline={mediaIndicatorIsInline}>
      {!mediaIndicatorIsInline && (
        <StyledTime dateTime="PT2M15S">2:15</StyledTime>
      )}
    </MediaIndicator>
  );
};

const HiddenText = ({ type, headline }) => (
  /* eslint-disable-next-line jsx-a11y/aria-role */
  <span role="text">
    <VisuallyHiddenText>{`${type}, `}</VisuallyHiddenText>
    <span>{headline}</span>
    <VisuallyHiddenText>, 2,15</VisuallyHiddenText>
  </span>
);

const InfoComponent = ({
  headlineText,
  summaryText,
  promoType,
  isLive,
  dir,
  type,
  alsoItems,
  promoHasImage,
  mediaIndicatorIsInline,
}) => (
  <>
    <Headline
      promoType={promoType}
      promoHasImage={promoHasImage}
      mediaIndicatorIsInline={mediaIndicatorIsInline}
    >
      <Link href="https://www.bbc.co.uk/news">
        {isLive ? (
          <LiveLabel dir={dir} ariaHidden offScreenText="Live">
            {headlineText}
          </LiveLabel>
        ) : (
          <HiddenText headline={headlineText} type={type} />
        )}
      </Link>
    </Headline>
    <Summary
      promoType={promoType}
      service={service}
      promoHasImage={promoHasImage}
    >
      {summaryText}
    </Summary>
    {promoType === 'top' && alsoItems && (
      <IndexAlsosContainer alsoItems={alsoItems} dir={dir} />
    )}
  </>
);

const generateStory =
  ({ promoType, alsoItems = null, displayImage = true }) =>
  ({ longText: textSnippet, dir }) => {
    const mediaType = select(
      'Media Type',
      ['No media', 'video', 'audio', 'photogallery'],
      'No media',
    );

    const Info = (
      <InfoComponent
        headlineText={textSnippet}
        summaryText={textSnippet}
        promoType={promoType}
        isLive={boolean('isLive', false)}
        dir={dir}
        type={mediaType}
        alsoItems={alsoItems}
        promoHasImage={displayImage}
        mediaIndicatorIsInline={mediaType && !displayImage}
      />
    );

    const Img = buildImg();

    return (
      <StoryPromo
        dir={dir}
        image={Img}
        info={Info}
        promoType={promoType}
        displayImage={displayImage}
        mediaIndicator={
          mediaType !== 'No media' &&
          MediaIndicatorComponent({
            type: mediaType,
            dir,
            mediaIndicatorIsInline: mediaType && !displayImage,
          })
        }
        mediaIndicatorIsInline={!displayImage}
      />
    );
  };

/* eslint-disable-next-line no-shadow */
const generate2FeatureStory = () => args => (
  <Grid
    columns={{
      group0: 8,
      group1: 8,
      group2: 8,
      group3: 8,
      group4: 8,
      group5: 8,
    }}
    enableGelGutters
    {...args}
  >
    <Grid
      item
      columns={{
        group0: 8,
        group1: 8,
        group2: 8,
        group3: 8,
        group4: 6,
        group5: 6,
      }}
      {...args}
    >
      {generateStory({ promoType: 'leading' })(args)}
    </Grid>
    <Grid
      columns={{
        group0: 8,
        group1: 8,
        group2: 8,
        group3: 8,
        group4: 2,
        group5: 2,
      }}
      enableGelGutters
      {...args}
    >
      <Grid
        item
        columns={{
          group0: 8,
          group1: 8,
          group2: 8,
          group3: 8,
          group4: 2,
          group5: 2,
        }}
        {...args}
      >
        {generateStory({ promoType: 'regular' })(args)}
      </Grid>
    </Grid>
  </Grid>
);

storiesOf('Components/StoryPromo/StoryPromo', module)
  .addDecorator(withKnobs)
  .addDecorator(withServicesKnob())
  .add('Regular promo', generateStory({ promoType: 'regular' }), {
    notes,
    knobs: { escapeHTML: false },
  })
  .add(
    'Regular promo - No image',
    generateStory({ promoType: 'regular', displayImage: false }),
    {
      notes,
      knobs: { escapeHTML: false },
    },
  )
  .add('Top story promo', generateStory({ promoType: 'top' }), {
    notes,
    knobs: { escapeHTML: false },
  })
  .add(
    'Top story promo - Index Alsos - multiple',
    generateStory({ promoType: 'top', alsoItems: relatedItems }),
    {
      notes,
      knobs: { escapeHTML: false },
    },
  )
  .add(
    'Top story promo - Index Alsos - one',
    generateStory({ promoType: 'top', alsoItems: [relatedItems[0]] }),
    {
      notes,
      knobs: { escapeHTML: false },
    },
  )
  .add('Leading promo', generateStory({ promoType: 'leading' }), {
    notes,
    knobs: { escapeHTML: false },
  })
  .add('Leading promo and regular promo', generate2FeatureStory(), {
    notes,
    knobs: { escapeHTML: false },
  });
