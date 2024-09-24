import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import Timestamp from '#psammead/psammead-timestamp/src';
import Image from '#psammead/psammead-image/src';
import latin from '../../../components/ThemeProvider/fontScripts/latin';
import StoryPromo, {
  Headline,
  Summary,
  Link,
} from '#psammead/psammead-story-promo/src';
import Grid from '#psammead/psammead-grid/src';
import { StoryPromoLi, StoryPromoLiBase, StoryPromoUl } from './index';
import storyPromoData from '../testHelpers/fixtureData';
import notes from '../README.md';

const ImageComponent = ({ alt, src }) => (
  <Image
    alt={alt}
    src={src}
    width="640"
    srcset={`${src}.webp 640w`}
    fallbackSrcset={`${src} 640w`}
    primaryMimeType="image/webp"
    fallbackMimeType="image/jpeg"
  />
);

const InfoComponent = ({ headlineText, summaryText, datetime, dateformat }) => (
  <>
    <Headline script={latin} service="news">
      <Link href="https://www.bbc.co.uk/news">{headlineText}</Link>
    </Headline>
    <Summary script={latin} service="news">
      {summaryText}
    </Summary>
    <Timestamp
      datetime={datetime}
      script={latin}
      padding={false}
      service="news"
    >
      {dateformat}
    </Timestamp>
  </>
);

storiesOf('Components/StoryPromo/StoryPromoList', module)
  .addDecorator(withKnobs)
  .add(
    'default',
    () => (
      <StoryPromoUl>
        {storyPromoData.map(item => {
          const ImagePromo = (
            <ImageComponent src={item.image.src} alt={item.image.alt} />
          );

          const InfoPromo = (
            <InfoComponent
              headlineText={item.info.headline}
              summaryText={item.info.summary}
              datetime={item.info.datetime}
              dateformat={item.info.dateformat}
            />
          );

          return (
            <StoryPromoLi
              key={item.info.headline}
              border={boolean('show border?', true)}
            >
              <StoryPromo image={ImagePromo} info={InfoPromo} />
            </StoryPromoLi>
          );
        })}
      </StoryPromoUl>
    ),
    { notes },
  )
  .add('Example with promos without image', ({ dir }) => {
    const parentGridColumns = {
      group0: 6,
      group1: 6,
      group2: 6,
      group3: 6,
      group4: 8,
      group5: 8,
    };

    const noImageStoryColumns = {
      group0: 6,
      group1: 6,
      group2: 6,
      group3: 3,
      group4: 2,
      group5: 2,
    };

    const renderGridItem = border => (
      <Grid
        dir={dir}
        item
        columns={noImageStoryColumns}
        parentColumns={parentGridColumns}
        as={StoryPromoLi}
        border={border}
      >
        <p>
          The critic, author, poet and TV host was known for his witty
          commentary on international television.
        </p>
      </Grid>
    );

    return (
      <Grid
        dir={dir}
        columns={parentGridColumns}
        enableGelGutters
        as={StoryPromoUl}
      >
        {renderGridItem()}
        {renderGridItem()}
        {renderGridItem(false)}
        {renderGridItem()}
      </Grid>
    );
  });

storiesOf('Components/StoryPromo/StoryPromoListBase', module)
  .addDecorator(withKnobs)
  .add(
    'default',
    () => (
      <StoryPromoUl>
        {storyPromoData.map(item => {
          const ImagePromo = (
            <ImageComponent src={item.image.src} alt={item.image.alt} />
          );

          const InfoPromo = (
            <InfoComponent
              headlineText={item.info.headline}
              summaryText={item.info.summary}
              datetime={item.info.datetime}
              dateformat={item.info.dateformat}
            />
          );

          return (
            <StoryPromoLiBase
              key={item.info.headline}
              border={boolean('show border?', true)}
            >
              <StoryPromo image={ImagePromo} info={InfoPromo} />
            </StoryPromoLiBase>
          );
        })}
      </StoryPromoUl>
    ),
    { notes },
  );
