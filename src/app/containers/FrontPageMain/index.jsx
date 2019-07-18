/* eslint-disable jsx-a11y/aria-role */
import React, { Fragment, useContext } from 'react';
import VisuallyHiddenText from '@bbc/psammead-visually-hidden-text';
import pathOr from 'ramda/src/pathOr';
import { frontPageDataPropTypes } from '../../models/propTypes/frontPage';
import { Grid, GridItemConstrainedLarge } from '../../lib/styledGrid';
import { ServiceContext } from '../../contexts/ServiceContext';
import FrontPageSection from '../FrontPageSection';
import MetadataContainer from '../Metadata';
import ATIAnalytics from '../ATIAnalytics';

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
          <GridItemConstrainedLarge>
            {groups.map((group, index) => (
              <FrontPageSection
                key={group.title}
                group={group}
                sectionNumber={index}
              />
            ))}
          </GridItemConstrainedLarge>
        </Grid>
      </main>
    </Fragment>
  );
};

FrontPageMain.propTypes = {
  frontPageData: frontPageDataPropTypes.isRequired,
};

export default FrontPageMain;
