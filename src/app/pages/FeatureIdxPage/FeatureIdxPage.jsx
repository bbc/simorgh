import React, { useContext, Fragment } from 'react';
import path from 'ramda/src/path';
import { ServiceContext } from '#contexts/ServiceContext';
import MetadataContainer from '#containers/Metadata';
import LinkedData from '#containers/LinkedData';
import IndexHeading from '#containers/IndexHeading';
import IndexPageContainer from '#app/components/PageLayout/IndexPageContainer';
import IndexPageSection from '#containers/IndexPageSection';
import idxPageDataPropTypes from '#models/propTypes/idxPage';
import ATIAnalytics from '#containers/ATIAnalytics';
import ChartbeatAnalytics from '#containers/ChartbeatAnalytics';
import ComscoreAnalytics from '#containers/ComscoreAnalytics';

const FeatureIdxPage = ({ pageData }) => {
  const { lang } = useContext(ServiceContext);

  const groups = path(['content', 'groups'], pageData);
  const title = path(['metadata', 'title'], pageData);
  const summary = path(['metadata', 'summary'], pageData);
  const seoTitle = path(['promo', 'name'], pageData);

  return (
    <>
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
      <main role="main">
        <IndexPageContainer>
          <IndexHeading id="content" pageType="fix">
            {title}
          </IndexHeading>
          {groups.map((group, index) => (
            <Fragment key={group.title}>
              <IndexPageSection
                group={group}
                sectionNumber={index}
                renderWithoutStrapline
              />
            </Fragment>
          ))}
        </IndexPageContainer>
      </main>
    </>
  );
};

FeatureIdxPage.propTypes = {
  pageData: idxPageDataPropTypes.isRequired,
};

export default FeatureIdxPage;
