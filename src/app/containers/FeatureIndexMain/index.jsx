import React from 'react';
import path from 'ramda/src/path';
import { featureIndexDataPropTypes } from '#models/propTypes/featureIndex';
import MetadataContainer from '../Metadata';
import LinkedData from '../LinkedData';
import ATIAnalytics from '../ATIAnalytics';
import ChartbeatAnalytics from '../ChartbeatAnalytics';
import Index from '../Index';

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
        <Index groups={groups} title={title} />
      </main>
    </>
  );
};

FeatureIndexMain.propTypes = {
  featureIndexData: featureIndexDataPropTypes.isRequired,
};

export default FeatureIndexMain;
