/** @jsxRuntime classic */
/** @jsx jsx */
import path from 'ramda/src/path';
import { jsx } from '@emotion/react';
import { articleDataPropTypes } from '#models/propTypes/article';
import LatestMediaSection from './PagePromoSections/LatestMediaSection';
import styles from './MediaArticlePage.styles';

const SecondaryColumn = ({ pageData }) => {
  const latestMediaContent = path(['secondaryColumn', 'latestMedia'], pageData);
  if (!latestMediaContent) return null;

  return (
    <div css={styles.latestMediaColumn}>
      {latestMediaContent && (
        <div data-testid="latest-media" css={styles.responsiveComponentWrapper}>
          <LatestMediaSection content={latestMediaContent} />
        </div>
      )}
    </div>
  );
};

SecondaryColumn.propTypes = {
  pageData: articleDataPropTypes.isRequired,
};

export default SecondaryColumn;
