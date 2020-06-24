import React, { useContext } from 'react';
import { arrayOf, shape, number, string } from 'prop-types';
import styled from 'styled-components';
import path from 'ramda/src/path';
import SectionLabel from '@bbc/psammead-section-label';
import StoryPromo, { Headline, Link } from '@bbc/psammead-story-promo';
import { StoryPromoLi, StoryPromoUl } from '@bbc/psammead-story-promo-list';
import { C_LUNAR, C_EBON, C_GHOST } from '@bbc/psammead-styles/colours';
import Image from '@bbc/psammead-image';
import { getDoublePica } from '@bbc/gel-foundations/typography';
import { getSansRegular } from '@bbc/psammead-styles/font-styles';
import {
  GEL_SPACING,
  GEL_SPACING_HLF,
  GEL_SPACING_DBL,
} from '@bbc/gel-foundations/spacings';

import { ServiceContext } from '#contexts/ServiceContext';
import useToggle from '#hooks/useToggle';
import CpsOnwardJourney from '../CpsOnwardJourney';
import Grid from '../../components/Grid';
import data from './recommendations.ltr.json';

const StoryPromoWrapper = styled(StoryPromo)`
  display: grid;
  margin: ${GEL_SPACING_HLF} ${GEL_SPACING_DBL};
  background-color: ${C_GHOST};
`;

const CustomSectionLabel = styled(SectionLabel).attrs(props => ({
  'aria-labelledby': props.labelId,
}))`
  ${({ script }) => script && getDoublePica(script)};
  ${({ service }) => getSansRegular(service)};
  color: ${C_EBON};
  margin-top: 0;
  background-color: ${C_LUNAR};
`;

const SectionLabelWrapper = styled.div`
  padding: ${GEL_SPACING_DBL};
`;

const WsojWrapper = styled.div`
  background-color: ${C_LUNAR};
  padding-bottom: ${GEL_SPACING};
`;

const StyledStoryPromoLi = styled(StoryPromoLi)`
  /* Override various paddings set by StoryPromoLi */
  padding: 0 !important;
`;

const getPromoItemProps = item => ({
  src: path(['indexImage', 'path'], item),
  href: path(['locators', 'assetUri'], item),
  headline: path(['headlines', 'headline'], item),
});

const toStoryPromoItem = ({ assetUri, shortHeadline, imageHref }) => ({
  headlines: {
    headline: shortHeadline,
  },
  locators: {
    assetUri,
  },
  indexImage: {
    path: imageHref,
  },
  uri: assetUri,
});

const transformItems = items => items.map(toStoryPromoItem);

const CpsRecommendations = ({ parentColumns, items }) => {
  const { script, service, dir, recommendations } = useContext(ServiceContext);
  const { enabled } = useToggle('cpsRecommendations');

  const { hasStoryRecommendations } = recommendations;

  if (!hasStoryRecommendations || !enabled) return null;

  const singleTransform = item => {
    const { src, href, headline } = getPromoItemProps(item);

    const Img = <Image alt="" src={src} />;

    const Info = (
      <Headline script={script} service={service} promoHasImage>
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
            group4: 12,
            group5: 12,
          }}
          as={StyledStoryPromoLi}
          key={item.uri}
          dir={dir}
        >
          {singleTransform(item)}
        </Grid>
      ))}
    </Grid>
  );

  const renderSectionLabel = () => (
    <SectionLabelWrapper>
      <CustomSectionLabel
        script={script}
        service={service}
        dir={dir}
        labelId="recommendations-heading"
        bar={false}
        as="strong"
      >
        Recommendations
      </CustomSectionLabel>
    </SectionLabelWrapper>
  );

  return (
    <WsojWrapper>
      <CpsOnwardJourney
        labelId="recommendations-heading"
        title="Recommendations"
        content={transformItems(items)}
        parentColumns={parentColumns}
        singleTransform={singleTransform}
        listTransform={listTransform}
        renderCustomLabel={renderSectionLabel}
        hasCustomLabel
      />
    </WsojWrapper>
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
  ),
  parentColumns: shape({
    group0: number,
    group1: number,
    group2: number,
    group3: number,
    group4: number,
    group5: number,
  }).isRequired,
};

CpsRecommendations.defaultProps = {
  items: data.items,
};
