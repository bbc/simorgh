import React, { useContext, Fragment } from 'react';
import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';
import { RequestContext } from '#contexts/RequestContext';
import MetadataContainer from '#containers/Metadata';
import LinkedData from '#containers/LinkedData';
import IndexHeading from '#containers/IndexHeading';
import IndexPageContainer from '#components/PageLayout/IndexPageContainer';
import IndexPageSection from '#containers/IndexPageSection';
import idxPageDataPropTypes from '#models/propTypes/idxPage';
import ATIAnalytics from '#containers/ATIAnalytics';
import ChartbeatAnalytics from '#containers/ChartbeatAnalytics';
import ComscoreAnalytics from '#containers/ComscoreAnalytics';
import CanonicalAdBootstrapJs from '#containers/Ad/Canonical/CanonicalAdBootstrapJs';
import useToggle from '#hooks/useToggle';
import AdContainer from '#containers/Ad';
import MPUContainer from '#containers/Ad/MPU';
import { ServiceContext } from '../../contexts/ServiceContext';
import flattenGroups from './flattenGroups';

const FeatureIdxPage = ({ pageData }) => {
  const { lang } = useContext(ServiceContext);
  const { isAmp, showAdsBasedOnLocation } = useContext(RequestContext);
  const { enabled: adsEnabled } = useToggle('ads');

  const groups = flattenGroups(pathOr([], ['content', 'groups'], pageData));
  const title = path(['metadata', 'title'], pageData);
  const summary = path(['metadata', 'summary'], pageData);
  const seoTitle = path(['promo', 'name'], pageData);

  const isCanonical = !isAmp;

  const shouldBootstrapCanonicalAds = [
    adsEnabled,
    showAdsBasedOnLocation,
    isCanonical,
  ].every(Boolean);

  return (
    <>
      {/* dotcom and dotcomConfig need to be setup before the main dotcom javascript file is loaded */}
      {shouldBootstrapCanonicalAds && <CanonicalAdBootstrapJs />}
      <ATIAnalytics data={pageData} />
      <ChartbeatAnalytics data={pageData} />
      <ComscoreAnalytics />
      <MetadataContainer
        title={title}
        lang={lang}
        description={summary}
        openGraphType="website"
      />
      <LinkedData type="WebPage" seoTitle={seoTitle} />
      <AdContainer slotType="leaderboard" />
      <main role="main">
        <IndexPageContainer>
          <IndexHeading id="content" pageType="fix">
            {title}
          </IndexHeading>
          {groups.map((group, index) => {
            const isFirstSection = index === 0;

            return (
              <Fragment key={group.title}>
                <IndexPageSection
                  group={group}
                  sectionNumber={index}
                  showAllPromos
                />
                {isFirstSection && <MPUContainer />}
              </Fragment>
            );
          })}
        </IndexPageContainer>
      </main>
    </>
  );
};

FeatureIdxPage.propTypes = {
  pageData: idxPageDataPropTypes.isRequired,
};

export default FeatureIdxPage;
