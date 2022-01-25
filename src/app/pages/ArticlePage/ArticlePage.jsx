import React, { useContext } from 'react';
import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';
import propEq from 'ramda/src/propEq';
import last from 'ramda/src/last';
import styled from '@emotion/styled';
import isLive from '#lib/utilities/isLive';
import { string, node } from 'prop-types';
import {
  GEL_GROUP_1_SCREEN_WIDTH_MAX,
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MAX,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MAX,
  GEL_GROUP_5_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';
import {
  GEL_MARGIN_ABOVE_400PX,
  GEL_MARGIN_BELOW_400PX,
  GEL_SPACING,
  GEL_SPACING_DBL,
  GEL_SPACING_TRPL,
  GEL_SPACING_QUAD,
  GEL_SPACING_QUIN,
} from '@bbc/gel-foundations/spacings';
import { C_GREY_2, C_WHITE } from '@bbc/psammead-styles/colours';
import { singleTextBlock } from '#app/models/blocks';
import { articleDataPropTypes } from '#models/propTypes/article';
import ArticleMetadata from '#containers/ArticleMetadata';
import { ServiceContext } from '#contexts/ServiceContext';
import headings from '#containers/Headings';
import visuallyHiddenHeadline from '#containers/VisuallyHiddenHeadline';
import gist from '#containers/Gist';
import text from '#containers/Text';
import Image from '#containers/Image';
import Disclaimer from '#containers/Disclaimer';
import Blocks from '#containers/Blocks';
import Timestamp from '#containers/ArticleTimestamp';
import ATIAnalytics from '#containers/ATIAnalytics';
import ChartbeatAnalytics from '#containers/ChartbeatAnalytics';
import ComscoreAnalytics from '#containers/ComscoreAnalytics';
import articleMediaPlayer from '#containers/ArticleMediaPlayer';
import LinkedData from '#containers/LinkedData';
import MostReadContainer from '#containers/MostRead';
import MostReadSection from '#containers/MostRead/section';
import MostReadSectionLabel from '#containers/MostRead/label';
import SocialEmbedContainer from '#containers/SocialEmbed';

import {
  getArticleId,
  getHeadline,
  getSummary,
  getFirstPublished,
  getLastPublished,
  getAboutTags,
  getArticleSection,
  getMentions,
  getLang,
} from '#lib/utilities/parseAssetData';
import filterForBlockType from '#lib/utilities/blockHandlers';
import RelatedTopics from '#containers/RelatedTopics';
import NielsenAnalytics from '#containers/NielsenAnalytics';
import ScrollablePromo from '#components/ScrollablePromo';
import ArticleRelatedContent from '#containers/ArticleRelatedContent';

import SecondaryColumn from './SecondaryColumn';

import ArticlePageGrid, { Primary } from './ArticlePageGrid';

const componentsToRender = {
  visuallyHiddenHeadline,
  headline: headings,
  subheadline: headings,
  audio: articleMediaPlayer,
  video: articleMediaPlayer,
  text,
  image: props => <Image {...props} sizes="(min-width: 1008px) 760px, 100vw" />,
  timestamp: props => <Timestamp {...props} popOut={false} />,
  social: SocialEmbedContainer,
  group: gist,
  links: isLive() ? null : props => <ScrollablePromo {...props} />,
};

const Wrapper = styled.div`
  background-color: ${C_GREY_2};
`;

const ArticlePageMostReadSection = styled(MostReadSection)`
  @media (max-width: ${GEL_GROUP_1_SCREEN_WIDTH_MAX}) {
    margin: 0 ${GEL_MARGIN_BELOW_400PX} 0 ${GEL_MARGIN_BELOW_400PX};
    padding-bottom: ${GEL_SPACING_TRPL};
  }
  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
    margin: 0 ${GEL_MARGIN_ABOVE_400PX} 0 ${GEL_MARGIN_ABOVE_400PX};
    padding-bottom: ${GEL_SPACING_QUAD};
  }
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_4_SCREEN_WIDTH_MAX}) {
    margin: 0 ${GEL_MARGIN_ABOVE_400PX} 0 ${GEL_MARGIN_ABOVE_400PX};
    padding-bottom: ${GEL_SPACING_QUIN};
  }
  @media (min-width: ${GEL_GROUP_5_SCREEN_WIDTH_MIN}) {
    width: 100%; /* Needed for IE11 */
    margin: 0 auto;
    padding: 0 ${GEL_SPACING_DBL} ${GEL_SPACING_TRPL};
    max-width: ${GEL_GROUP_5_SCREEN_WIDTH_MIN};
  }
`;

const Main = styled.main`
  padding-bottom: ${GEL_SPACING_TRPL};
`;

const StyledRelatedTopics = styled(RelatedTopics)`
  margin: ${GEL_SPACING_DBL};
  padding-bottom: ${GEL_SPACING};
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    margin: ${GEL_SPACING_QUAD} 0;
    padding-bottom: ${GEL_SPACING_QUAD};
  }
`;

const ArticlePage = ({ pageData, mostReadEndpointOverride }) => {
  const { articleAuthor, showRelatedTopics } = useContext(ServiceContext);
  const headline = getHeadline(pageData);
  const description = getSummary(pageData) || getHeadline(pageData);
  const firstPublished = getFirstPublished(pageData);
  const lastPublished = getLastPublished(pageData);
  const aboutTags = getAboutTags(pageData);
  const topics = path(['metadata', 'topics'], pageData);
  const blocks = pathOr([], ['content', 'model', 'blocks'], pageData);
  const startsWithHeading = propEq('type', 'headline')(blocks[0] || {});

  const visuallyHiddenBlock = {
    id: null,
    model: { blocks: [singleTextBlock(headline)] },
    type: 'visuallyHiddenHeadline',
  };

  const articleBlocks = startsWithHeading
    ? blocks
    : [visuallyHiddenBlock, ...blocks];

  const promoImageBlocks = pathOr(
    [],
    ['promo', 'images', 'defaultPromoImage', 'blocks'],
    pageData,
  );

  const promoImageAltText = path(
    ['model', 'blocks', 0, 'model', 'blocks', 0, 'model', 'text'],
    filterForBlockType(promoImageBlocks, 'altText'),
  );

  const promoImage = path(
    ['model', 'locator'],
    filterForBlockType(promoImageBlocks, 'rawImage'),
  );

  const MostReadWrapper = ({ children }) => (
    <ArticlePageMostReadSection>
      <MostReadSectionLabel mobileDivider={showRelatedTopics && topics} />
      {children}
    </ArticlePageMostReadSection>
  );

  MostReadWrapper.propTypes = {
    children: node.isRequired,
  };

  return (
    <Wrapper>
      <ATIAnalytics data={pageData} />
      <ChartbeatAnalytics data={pageData} />
      <ComscoreAnalytics />
      <NielsenAnalytics />
      <ArticleMetadata
        articleId={getArticleId(pageData)}
        title={headline}
        author={articleAuthor}
        firstPublished={firstPublished}
        lastPublished={lastPublished}
        section={getArticleSection(pageData)}
        aboutTags={aboutTags}
        mentionsTags={getMentions(pageData)}
        lang={getLang(pageData)}
        description={description}
        imageLocator={promoImage}
        imageAltText={promoImageAltText}
      />
      <LinkedData
        showAuthor
        type="Article"
        seoTitle={headline}
        headline={headline}
        datePublished={firstPublished}
        dateModified={lastPublished}
        aboutTags={aboutTags}
        imageLocator={promoImage}
      />
      <ArticlePageGrid>
        <Primary>
          <Main role="main">
            <Disclaimer />
            <Blocks
              blocks={articleBlocks}
              componentsToRender={componentsToRender}
            />
          </Main>
          {showRelatedTopics && topics && (
            <StyledRelatedTopics
              topics={topics}
              mobileDivider={false}
              backgroundColour={C_GREY_2}
              tagBackgroundColour={C_WHITE}
            />
          )}
          <ArticleRelatedContent content={last(blocks)} />
        </Primary>
        <SecondaryColumn pageData={pageData} />
      </ArticlePageGrid>
      <MostReadContainer
        mostReadEndpointOverride={mostReadEndpointOverride}
        wrapper={MostReadWrapper}
      />
    </Wrapper>
  );
};

ArticlePage.propTypes = {
  pageData: articleDataPropTypes.isRequired,
  mostReadEndpointOverride: string,
};

ArticlePage.defaultProps = {
  mostReadEndpointOverride: null,
};

export default ArticlePage;
