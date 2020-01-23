/* eslint-disable jsx-a11y/aria-role */
import React, { useContext } from 'react';
import VisuallyHiddenText from '@bbc/psammead-visually-hidden-text';
import path from 'ramda/src/path';
import Grid, { FrontPageGrid } from '#app/components/Grid';
import { frontPageDataPropTypes } from '#models/propTypes/frontPage';
import { ServiceContext } from '#contexts/ServiceContext';
import FrontPageSection from '../FrontPageSection';
import MetadataContainer from '../Metadata';
import LinkedData from '../LinkedData';
import ATIAnalytics from '../ATIAnalytics';
import ChartbeatAnalytics from '../ChartbeatAnalytics';

const mainColumns = {
  group0: 6,
  group1: 6,
  group2: 6,
  group3: 6,
  group4: 8,
  group5: 20,
};

const itemColumns = {
  group0: 6,
  group1: 6,
  group2: 6,
  group3: 6,
  group4: 6,
  group5: 12,
};

const itemMargins = {
  group0: true,
  group1: true,
  group2: true,
  group3: true,
};

const startOffsets = {
  group0: 1,
  group1: 1,
  group2: 1,
  group3: 1,
  group4: 2,
  group5: 5,
};

const FrontPageMain = ({ pageData }) => {
  const {
    product,
    serviceLocalizedName,
    translations,
    frontPageTitle,
  } = useContext(ServiceContext);
  const home = path(['home'], translations);
  const groups = path(['content', 'groups'], pageData);
  const lang = path(['metadata', 'language'], pageData);
  const description = path(['metadata', 'summary'], pageData);
  const seoTitle = path(['promo', 'name'], pageData);

  // eslint-disable-next-line jsx-a11y/aria-role
  const offScreenText = (
    <span role="text">
      <span lang="en-GB">{product}</span>, {serviceLocalizedName} - {home}
    </span>
  );

  return (
    <>
      <ATIAnalytics data={pageData} />
      <ChartbeatAnalytics data={pageData} />
      <MetadataContainer
        title={frontPageTitle}
        lang={lang}
        description={description}
        openGraphType="website"
      />
      <LinkedData type="WebPage" seoTitle={seoTitle} />
      <main role="main">
        <VisuallyHiddenText id="content" tabIndex="-1" as="h1">
          {offScreenText}
        </VisuallyHiddenText>
        <FrontPageGrid columns={mainColumns} enableGelGutters>
          <Grid
            item
            columns={itemColumns}
            startOffset={startOffsets}
            margins={itemMargins}
          >
            {groups.map((group, index) => (
              <FrontPageSection
                key={group.title}
                group={group}
                sectionNumber={index}
              />
            ))}
          </Grid>
        </FrontPageGrid>
      </main>
    </>
  );
};

FrontPageMain.propTypes = {
  pageData: frontPageDataPropTypes.isRequired,
};

export default FrontPageMain;
