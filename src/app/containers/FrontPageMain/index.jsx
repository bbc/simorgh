/* eslint-disable jsx-a11y/aria-role */
import React, { Fragment, useContext } from 'react';
import styled from 'styled-components';
import VisuallyHiddenText from '@bbc/psammead-visually-hidden-text';
import { GEL_GROUP_2_SCREEN_WIDTH_MIN } from '@bbc/gel-foundations/breakpoints';
import { GEL_SPACING, GEL_SPACING_DBL } from '@bbc/gel-foundations/spacings';
import pathOr from 'ramda/src/pathOr';
import { frontPageDataPropTypes } from '../../models/propTypes/frontPage';
import { Grid, GridItemConstrainedLarge } from '../../lib/styledGrid';
import { ServiceContext } from '../../contexts/ServiceContext';
import FrontPageSection from '../FrontPageSection';
import MetadataContainer from '../Metadata';
import ATIAnalytics from '../ATIAnalytics';

const GridItemConstrainedLargeWithTopMargin = styled(GridItemConstrainedLarge)`
  margin-top: ${GEL_SPACING};

  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    margin-top: ${GEL_SPACING_DBL};
  }
`;

const FrontPageMain = ({ frontPageData }) => {
  const { product, serviceLocalizedName, translations } = useContext(
    ServiceContext,
  );
  const { home } = translations;

  const groups = pathOr(null, ['content', 'groups'], frontPageData);
  const { metadata, promo } = frontPageData;

  // eslint-disable-next-line jsx-a11y/aria-role
  const offScreenText = (
    <Fragment>
      <span role="text">
        <span lang="en-GB">{product}</span>, {serviceLocalizedName} - {home}
      </span>
    </Fragment>
  );

  return (
    <Fragment>
      <ATIAnalytics data={frontPageData} />
      <MetadataContainer metadata={metadata} promo={promo} />
      <main role="main">
        <VisuallyHiddenText id="content" tabIndex="-1" as="h1">
          {offScreenText}
        </VisuallyHiddenText>
        <Grid>
          <GridItemConstrainedLargeWithTopMargin>
            {groups.map((group, index) => (
              <FrontPageSection
                key={group.title}
                group={group}
                sectionNumber={index}
              />
            ))}
          </GridItemConstrainedLargeWithTopMargin>
        </Grid>
      </main>
    </Fragment>
  );
};

FrontPageMain.propTypes = {
  frontPageData: frontPageDataPropTypes.isRequired,
};

export default FrontPageMain;
