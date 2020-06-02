import React, { Fragment } from 'react';
import path from 'ramda/src/path';
import PageContainer from '#lib/pageStyles/PageContainer';
import MetadataContainer from '#containers/Metadata';
import FrontPageSection from '#containers/FrontPageSection';
import idxPageDataPropTypes from '#models/propTypes/idxPage';

const IdxPage = ({ pageData }) => {
  const groups = path(['content', 'groups'], pageData);
  const summary = path(['metadata', 'summary'], pageData);
  const title = path(['metadata', 'title'], pageData);
  const lang = path(['metadata', 'language'], pageData);

  return (
    <>
      <MetadataContainer
        title={title}
        lang={lang}
        description={summary}
        openGraphType="website"
      />
      <main role="main">
        <h1 id="content">IDX Page</h1>
        <PageContainer>
          {groups.map((group, index) => (
            <Fragment key={group.title}>
              <FrontPageSection group={group} sectionNumber={index} />
            </Fragment>
          ))}
        </PageContainer>
      </main>
    </>
  );
};

IdxPage.propTypes = {
  pageData: idxPageDataPropTypes.isRequired,
};

export default IdxPage;
