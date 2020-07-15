import React, { useContext } from 'react';
import { arrayOf, shape, number, string } from 'prop-types';
import styled from 'styled-components';
import path from 'ramda/src/path';
import StoryPromo, { Headline, Link } from '@bbc/psammead-story-promo';
import { StoryPromoLiBase, StoryPromoUl } from '@bbc/psammead-story-promo-list';
import { C_LUNAR, C_GHOST } from '@bbc/psammead-styles/colours';
import Image from '@bbc/psammead-image';
import {
  GEL_SPACING,
  GEL_SPACING_HLF,
  GEL_SPACING_DBL,
} from '@bbc/gel-foundations/spacings';
import { GEL_GROUP_3_SCREEN_WIDTH_MAX } from '@bbc/gel-foundations/breakpoints';

import { ServiceContext } from '#contexts/ServiceContext';
import useToggle from '#hooks/useToggle';
import CpsOnwardJourney from '../CpsOnwardJourney';
import Grid from '../../components/Grid';

import transformToStoryPromoItems from './utils';

const StoryPromoWrapper = styled(StoryPromo)`
  display: grid;
  margin: ${GEL_SPACING_HLF} ${GEL_SPACING_DBL};
  background-color: ${C_GHOST};
  @media (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
    margin: ${GEL_SPACING_HLF} 0;
  }
`;

const RecommendationsWrapper = styled.div`
  background-color: ${C_LUNAR};
  padding-bottom: ${GEL_SPACING};
`;

const getPromoItemProps = item => ({
  src: path(['indexImage', 'path'], item),
  href: path(['locators', 'assetUri'], item),
  headline: path(['headlines', 'headline'], item),
  alt: path(['indexImage', 'altText'], item),
});

const CpsRecommendations = ({ items, parentColumns }) => {
  const { recommendations, script, service, dir } = useContext(ServiceContext);
  const { enabled } = useToggle('cpsRecommendations');

  const { hasStoryRecommendations } = recommendations;

  if (!hasStoryRecommendations || !enabled) return null;

  const singleTransform = item => {
    const { src, href, headline, alt } = getPromoItemProps(item);

    const Img = <Image alt={alt} src={src} />;

    const Info = (
      <Headline script={script} service={service} promoHasImage as="span">
        <Link href={href}>{headline}</Link>
      </Headline>
    );

    return (
      <Grid
        columns={{
          group0: 1,
          group1: 1,
          group2: 1,
          group3: 1,
          group4: 1,
          group5: 1,
        }}
        enableGelGutters
        dir={dir}
      >
        <StoryPromoWrapper image={Img} info={Info} />
      </Grid>
    );
  };

  const listTransform = promoItems => (
    <Grid
      columns={{
        group0: 6,
        group1: 6,
        group2: 6,
        group3: 6,
        group4: 6,
        group5: 6,
      }}
      as={StoryPromoUl}
      enableGelGutters
      dir={dir}
    >
      {promoItems.map(item => (
        <Grid
          item
          columns={{
            group0: 6,
            group1: 6,
            group2: 6,
            group3: 6,
            group4: 6,
            group5: 6,
          }}
          as={StoryPromoLiBase}
          border={false}
          key={item.uri}
          dir={dir}
        >
          {singleTransform(item)}
        </Grid>
      ))}
    </Grid>
  );

  const optionalLabelProps = {
    overrideHeadingAs: 'strong',
    bar: false,
    backgroundColor: C_LUNAR,
    isRecommendation: true,
  };

  return (
    <RecommendationsWrapper>
      <CpsOnwardJourney
        labelId="recommendations-heading"
        title="Recommendations"
        content={transformToStoryPromoItems(items)}
        parentColumns={parentColumns}
        singleTransform={singleTransform}
        listTransform={listTransform}
        optionalLabelProps={optionalLabelProps}
      />
    </RecommendationsWrapper>
  );
};

export default CpsRecommendations;

CpsRecommendations.propTypes = {
  items: arrayOf(
    shape({
      assetUri: string.isRequired,
      shortHeadline: string.isRequired,
      imageHref: string.isRequired,
    }),
  ).isRequired,
  parentColumns: shape({
    group0: number,
    group1: number,
    group2: number,
    group3: number,
    group4: number,
    group5: number,
  }).isRequired,
};
