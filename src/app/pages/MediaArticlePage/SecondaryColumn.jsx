/** @jsxRuntime classic */
/** @jsx jsx */
import path from 'ramda/src/path';
import { jsx } from '@emotion/react';
import { articleDataPropTypes } from '#models/propTypes/article';
import styled from '@emotion/styled';
import {
  GEL_SPACING,
  GEL_SPACING_DBL,
  GEL_SPACING_TRPL,
} from '#psammead/gel-foundations/src/spacings';
import { GEL_GROUP_4_SCREEN_WIDTH_MIN } from '#psammead/gel-foundations/src/breakpoints';
import LatestMediaSection from './PagePromoSections/LastestMediaSection';
import styles from './MediaArticlePage.styles';

const ResponsiveComponentWrapper = styled.div`
  margin-bottom: ${GEL_SPACING_TRPL};
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    margin-bottom: ${GEL_SPACING};
    padding: ${GEL_SPACING_DBL};
  }
`;

const SecondaryColumn = ({ pageData }) => {
  const topStoriesContent = path(['secondaryColumn', 'topStories'], pageData);
  const featuresContent = path(['secondaryColumn', 'features'], pageData);
  const latestMediaContent = path(['secondaryColumn', 'latestMedia'], pageData);

  if (!topStoriesContent && !featuresContent) return null;

  return (
    <div css={styles.secondaryColumn}>
      {latestMediaContent && (
        <ResponsiveComponentWrapper data-testid="latest-media">
          <LatestMediaSection content={latestMediaContent} />
        </ResponsiveComponentWrapper>
      )}
    </div>
  );
};

SecondaryColumn.propTypes = {
  pageData: articleDataPropTypes.isRequired,
};

export default SecondaryColumn;
