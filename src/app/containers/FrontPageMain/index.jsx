/* eslint-disable jsx-a11y/aria-role */
import React, { useContext } from 'react';
import path from 'ramda/src/path';
import { frontPageDataPropTypes } from '#models/propTypes/frontPage';
import { ServiceContext } from '#contexts/ServiceContext';
import Index from '../Index';
import MetadataContainer from '../Metadata';
import LinkedData from '../LinkedData';
import ATIAnalytics from '../ATIAnalytics';
import ChartbeatAnalytics from '../ChartbeatAnalytics';

const FrontPageMain = ({ frontPageData }) => {
  const {
    product,
    serviceLocalizedName,
    translations,
    frontPageTitle,
  } = useContext(ServiceContext);

  const home = path(['home'], translations);
  const groups = path(['content', 'groups'], frontPageData);
  const lang = path(['metadata', 'language'], frontPageData);
  const description = path(['metadata', 'summary'], frontPageData);
  const seoTitle = path(['promo', 'name'], frontPageData);

  const pageTitle = (
    <>
      <span lang="en-GB">{product}</span>, {serviceLocalizedName} - {home}
    </>
  );

  return (
    <>
      <ATIAnalytics data={frontPageData} />
      <ChartbeatAnalytics data={frontPageData} />
      <MetadataContainer
        title={frontPageTitle}
        lang={lang}
        description={description}
        openGraphType="website"
      />
      <LinkedData type="WebPage" seoTitle={seoTitle} />
      <main role="main">
        <Index groups={groups} title={pageTitle} hideTitle />
      </main>
    </>
  );
};

FrontPageMain.propTypes = {
  frontPageData: frontPageDataPropTypes.isRequired,
};

export default FrontPageMain;
