/** @jsxRuntime classic */
/** @jsx jsx */

import { useContext } from 'react';
import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';
import styled from '@emotion/styled';
import { jsx, useTheme } from '@emotion/react';
import { string, node } from 'prop-types';
import useToggle from '#hooks/useToggle';

import {
  GEL_GROUP_1_SCREEN_WIDTH_MAX,
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MAX,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MAX,
  GEL_GROUP_5_SCREEN_WIDTH_MIN,
} from '#psammead/gel-foundations/src/breakpoints';
import {
  GEL_MARGIN_ABOVE_400PX,
  GEL_MARGIN_BELOW_400PX,
  GEL_SPACING,
  GEL_SPACING_DBL,
  GEL_SPACING_TRPL,
  GEL_SPACING_QUAD,
  GEL_SPACING_QUIN,
} from '#psammead/gel-foundations/src/spacings';

import { articleDataPropTypes } from '#models/propTypes/article';
import ArticleMetadata from '#containers/ArticleMetadata';
import headings from '#containers/Headings';
import visuallyHiddenHeadline from '#containers/VisuallyHiddenHeadline';
import gist from '#containers/Gist';
import text from '#containers/Text';
import Image from '#containers/Image';
import Blocks from '#containers/Blocks';
import Timestamp from '#containers/ArticleTimestamp';
import ATIAnalytics from '#containers/ATIAnalytics';
import ChartbeatAnalytics from '#containers/ChartbeatAnalytics';
import ComscoreAnalytics from '#containers/ComscoreAnalytics';
import ArticleMediaPlayer from '#containers/ArticleMediaPlayer';
import LinkedData from '#containers/LinkedData';
import MostReadContainer from '#containers/MostRead';
import MostReadSection from '#containers/MostRead/section';
import MostReadSectionLabel from '#containers/MostRead/label';
import SocialEmbedContainer from '#containers/SocialEmbed';
import fauxHeadline from '#containers/FauxHeadline';
import CpsRecommendations from '#containers/CpsRecommendations';

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
import Byline from '../../components/Byline';
import {
  bylineExtractor,
  categoryName,
  getAuthorTwitterHandle,
} from '../../components/Byline/utilities';
import { ServiceContext } from '../../contexts/ServiceContext';
import RelatedContentSection from './PagePromoSections/RelatedContentSection';

import SecondaryColumn from './SecondaryColumn';

import MediaArticlePageGrid, { Primary } from './MediaArticlePageGrid';

import styles from './MediaArticlePage.styles';

const Wrapper = styled.div`
  background-color: ${props => props.theme.palette.GREY_2};
`;

const MediaArticlePageMostReadSection = styled(MostReadSection)`
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

const MediaArticlePage = ({ pageData, mostReadEndpointOverride }) => {
  const { articleAuthor, isTrustProjectParticipant, showRelatedTopics } =
    useContext(ServiceContext);
  const { enabled: preloadLeadImageToggle } = useToggle('preloadLeadImage');
  const recommendationsData = path(['recommendations'], pageData);

  const {
    palette: { GREY_2, WHITE },
  } = useTheme();

  const headline = getHeadline(pageData);
  const description = getSummary(pageData) || getHeadline(pageData);
  const firstPublished = getFirstPublished(pageData);
  const lastPublished = getLastPublished(pageData);
  const aboutTags = getAboutTags(pageData);
  const topics = path(['metadata', 'topics'], pageData);
  const blocks = pathOr([], ['content', 'model', 'blocks'], pageData);

  const bylineBlock = blocks.find(block => block.type === 'byline');
  const bylineContribBlocks = pathOr([], ['model', 'blocks'], bylineBlock);

  const bylineLinkedData = bylineExtractor(bylineContribBlocks);

  const hasByline = !!bylineLinkedData;

  const articleAuthorTwitterHandle = hasByline
    ? getAuthorTwitterHandle(blocks)
    : null;

  const taggings = path(['metadata', 'passport', 'taggings'], pageData);
  const formats = path(
    ['metadata', 'passport', 'predicates', 'formats'],
    pageData,
  );

  const componentsToRender = {
    fauxHeadline,
    visuallyHiddenHeadline,
    headline: headings,
    subheadline: headings,
    audio: props => (
      /**
       * TODO: Consolate the styling into a single stylesheet for the media player
       * - The media player needs padding top applied, but is also inheriting styles from other components
       */
      <div css={styles.mediaPlayer}>
        <ArticleMediaPlayer {...props} />
      </div>
    ),
    video: props => (
      /**
       * TODO: Consolate the styling into a single stylesheet for the media player
       * - The media player needs padding top applied, but is also inheriting styles from other components
       */
      <div css={styles.mediaPlayer}>
        <ArticleMediaPlayer {...props} />
      </div>
    ),
    text,
    byline: props =>
      hasByline ? (
        <Byline {...props}>
          <Timestamp
            firstPublished={new Date(firstPublished).getTime()}
            lastPublished={new Date(lastPublished).getTime()}
            popOut={false}
          />
        </Byline>
      ) : null,
    image: props => (
      <Image
        {...props}
        sizes="(min-width: 1008px) 760px, 100vw"
        shouldPreload={preloadLeadImageToggle}
      />
    ),
    timestamp: props =>
      hasByline ? null : <Timestamp {...props} popOut={false} />,
    social: SocialEmbedContainer,
    group: gist,
    links: props => <ScrollablePromo {...props} />,
    wsoj: props => (
      <CpsRecommendations {...props} items={recommendationsData} />
    ),
  };

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
    <MediaArticlePageMostReadSection>
      <MostReadSectionLabel mobileDivider={showRelatedTopics && topics} />
      {children}
    </MediaArticlePageMostReadSection>
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
        twitterHandle={articleAuthorTwitterHandle}
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
        bylineLinkedData={bylineLinkedData}
        type={categoryName(taggings, formats, isTrustProjectParticipant)}
        seoTitle={headline}
        headline={headline}
        datePublished={firstPublished}
        dateModified={lastPublished}
        aboutTags={aboutTags}
        imageLocator={promoImage}
      />
      <MediaArticlePageGrid>
        <Primary>
          <Main role="main">
            <Blocks blocks={blocks} componentsToRender={componentsToRender} />
          </Main>
          {showRelatedTopics && topics && (
            <StyledRelatedTopics
              topics={topics}
              mobileDivider={false}
              backgroundColour={GREY_2}
              tagBackgroundColour={WHITE}
            />
          )}
          <RelatedContentSection content={blocks} />
        </Primary>
        <SecondaryColumn pageData={pageData} />
      </MediaArticlePageGrid>
      <MostReadContainer
        mostReadEndpointOverride={mostReadEndpointOverride}
        wrapper={MostReadWrapper}
      />
    </Wrapper>
  );
};

MediaArticlePage.propTypes = {
  pageData: articleDataPropTypes.isRequired,
  mostReadEndpointOverride: string,
};

MediaArticlePage.defaultProps = {
  mostReadEndpointOverride: null,
};

export default MediaArticlePage;
