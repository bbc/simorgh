import React, { useContext } from 'react';
import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';
import styled from '@emotion/styled';
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
import { C_GREY_2 } from '@bbc/psammead-styles/colours';
import { articleDataPropTypes } from '#models/propTypes/article';
import ArticleMetadata from '#containers/ArticleMetadata';
import { ServiceContext } from '#contexts/ServiceContext';
import headings from '#containers/Headings';
import gist from '#containers/Gist';
import text from '#containers/Text';
import Image from '#containers/Image';
import Disclaimer from '#containers/Disclaimer';
import Blocks from '#containers/Blocks';
import timestamp from '#containers/ArticleTimestamp';
import { GelPageGrid, GridItemLarge } from '#components/Grid';
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
  getArticleSection,
  getLang,
} from '#lib/utilities/parseAssetData';
import filterForBlockType from '#lib/utilities/blockHandlers';
import RelatedTopics from '#containers/RelatedTopics';
import NielsenAnalytics from '#containers/NielsenAnalytics';

const componentsToRender = {
  headline: headings,
  subheadline: headings,
  audio: articleMediaPlayer,
  video: articleMediaPlayer,
  text,
  image: props => <Image {...props} sizes="(min-width: 1008px) 760px, 100vw" />,
  timestamp,
  social: SocialEmbedContainer,
  group: gist,
};

const ArticlePageMostReadSection = styled(MostReadSection)`
  @media (max-width: ${GEL_GROUP_1_SCREEN_WIDTH_MAX}) {
    margin: 0 ${GEL_MARGIN_BELOW_400PX} ${GEL_SPACING_TRPL};
  }
  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
    margin: 0 ${GEL_MARGIN_ABOVE_400PX} ${GEL_SPACING_QUAD};
  }
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_4_SCREEN_WIDTH_MAX}) {
    margin: 0 ${GEL_MARGIN_ABOVE_400PX} ${GEL_SPACING_QUIN};
  }
  @media (min-width: ${GEL_GROUP_5_SCREEN_WIDTH_MIN}) {
    width: 100%; /* Needed for IE11 */
    margin: 0 auto ${GEL_SPACING_TRPL};
    padding: 0 ${GEL_SPACING_DBL};
    max-width: ${GEL_GROUP_5_SCREEN_WIDTH_MIN};
  }
`;

const Main = styled.main`
  background-color: ${C_GREY_2};
  padding-bottom: ${GEL_SPACING_TRPL};
`;

const StyledRelatedTopics = styled(RelatedTopics)`
  margin-top: ${GEL_SPACING_DBL};
  padding-bottom: ${GEL_SPACING};
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    margin-top: ${GEL_SPACING_QUAD};
    padding-bottom: ${GEL_SPACING_QUAD};
  }
`;

const ArticlePage = ({ pageData, mostReadEndpointOverride }) => {
  const { articleAuthor, showRelatedTopics } = useContext(ServiceContext);
  const headline = getHeadline(pageData);
  const description = getSummary(pageData) || getHeadline(pageData);
  const firstPublished = getFirstPublished(pageData);
  const lastPublished = getLastPublished(pageData);
  const topics = path(['metadata', 'topics'], pageData);

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

  const ArticlePageGrid = ({ children }) => (
    <GelPageGrid
      enableGelGutters
      columns={{
        group0: 6,
        group1: 6,
        group2: 6,
        group3: 6,
        group4: 8,
        group5: 20,
      }}
    >
      {children}
    </GelPageGrid>
  );

  ArticlePageGrid.propTypes = {
    children: node.isRequired,
  };

  return (
    <>
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
        imageLocator={promoImage}
      />
      <Main role="main">
        <ArticlePageGrid>
          <Disclaimer />
          <Blocks
            blocks={path(['content', 'model', 'blocks'], pageData)}
            componentsToRender={componentsToRender}
          />
        </ArticlePageGrid>
      </Main>

      {showRelatedTopics && topics && (
        <ArticlePageGrid>
          <GridItemLarge>
            <StyledRelatedTopics
              topics={topics}
              mobileDivider={false}
              bar={false}
            />
          </GridItemLarge>
        </ArticlePageGrid>
      )}

      <MostReadContainer
        mostReadEndpointOverride={mostReadEndpointOverride}
        wrapper={MostReadWrapper}
      />
    </>
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
