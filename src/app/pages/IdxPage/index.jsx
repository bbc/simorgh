import React, { Fragment } from 'react';
import path from 'ramda/src/path';
import IndexHeading from '#containers/IndexHeading';
import { PageContainer } from '#lib/pageStyles/index';
import FrontPageSection from '#containers/FrontPageSection';
import idxPageDataPropTypes from '#models/propTypes/idxPage';

const IdxPage = ({ pageData }) => {
  const groups = path(['content', 'groups'], pageData);

  return (
    <main role="main">
      <PageContainer>
        <IndexHeading id="content">IDX Page</IndexHeading>
        {groups.map((group, index) => (
          <Fragment key={group.title}>
            <FrontPageSection group={group} sectionNumber={index} />
          </Fragment>
        ))}
      </PageContainer>
    </main>
  );
};

IdxPage.propTypes = {
  pageData: idxPageDataPropTypes.isRequired,
};

export default IdxPage;
