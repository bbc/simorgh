/* eslint-disable jsx-a11y/aria-role */
import React from 'react';
import path from 'ramda/src/path';
import { frontPageDataPropTypes } from '#models/propTypes/frontPage';
import MetadataContainer from '../Metadata';
import LinkedData from '../LinkedData';
import ATIAnalytics from '../ATIAnalytics';
import ChartbeatAnalytics from '../ChartbeatAnalytics';
import StoryPromoGroups from '../StoryPromoGroups';

const FeatureIndexMain = ({ featureIndexData }) => {
  const title = path(['metadata', 'title'], featureIndexData);
  const groups = path(['content', 'groups'], featureIndexData);
  const lang = path(['metadata', 'language'], featureIndexData);
  const description = path(['metadata', 'summary'], featureIndexData);
  const seoTitle = path(['promo', 'name'], featureIndexData);

  return (
    <>
      <ATIAnalytics data={featureIndexData} />
      <ChartbeatAnalytics data={featureIndexData} />
      <MetadataContainer
        title={title}
        lang={lang}
        description={description}
        openGraphType="website"
      />
      <LinkedData type="WebPage" seoTitle={seoTitle} />
      <main role="main">
        <h1>{title}</h1>
        <StoryPromoGroups groups={groups} />
      </main>
    </>
  );
};

FeatureIndexMain.propTypes = {
  featureIndexData: frontPageDataPropTypes.isRequired,
};

export default FeatureIndexMain;
