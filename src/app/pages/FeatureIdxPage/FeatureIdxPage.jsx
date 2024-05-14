import React, { useContext, Fragment } from 'react';
import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';
import IndexHeading from '#containers/IndexHeading';
import IndexPageContainer from '#components/PageLayout/IndexPageContainer';
import IndexPageSection from '#containers/IndexPageSection';
import ComscoreAnalytics from '#containers/ComscoreAnalytics';
import AdContainer from '../../components/Ad';
import MPUContainer from '../../components/Ad/MPU';
import ATIAnalytics from '../../components/ATIAnalytics';
import ChartbeatAnalytics from '../../components/ChartbeatAnalytics';
import MetadataContainer from '../../components/Metadata';
import { ServiceContext } from '../../contexts/ServiceContext';
import LinkedData from '../../components/LinkedData';
import flattenGroups from './flattenGroups';

const FeatureIdxPage = ({ pageData }) => {
  const { brandName, lang } = useContext(ServiceContext);

  const groups = flattenGroups(pathOr([], ['content', 'groups'], pageData));
  const title = path(['metadata', 'title'], pageData);
  const summary = path(['metadata', 'summary'], pageData);
  const seoTitle = path(['promo', 'name'], pageData);

  // ATI
  const {
    metadata: { atiAnalytics },
  } = pageData;
  const atiData = {
    ...atiAnalytics,
    pageTitle: `${atiAnalytics.pageTitle} - ${brandName}`,
  };

  return (
    <>
      <ATIAnalytics atiData={atiData} />
      <ChartbeatAnalytics
        sectionName={pageData?.relatedContent?.section?.name}
        categoryName={pageData?.metadata?.passport?.category?.categoryName}
        title={title}
      />
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

export default FeatureIdxPage;
