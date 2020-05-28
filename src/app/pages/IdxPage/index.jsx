import React, { Fragment } from 'react';
import path from 'ramda/src/path';
import idxPagePropTypes from './idxPageDataPropTypes';
import FrontPageSection from '#containers/FrontPageSection';

const IdxPage = ({ pageData }) => {
  const groups = path(['content', 'groups'], pageData);

  return (
    <main role="main">
      <h1 id="content">IDX Page</h1>
      {groups.map((group, index) => (
        <Fragment key={group.title}>
          <FrontPageSection group={group} sectionNumber={index} />
        </Fragment>
      ))}
    </main>
  );
};

IdxPage.propTypes = {
  pageData: idxPagePropTypes.isRequired,
};

export default IdxPage;
