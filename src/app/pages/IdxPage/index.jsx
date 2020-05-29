import React, { Fragment } from 'react';
import path from 'ramda/src/path';
import StyledPageDiv from '#lib/pageStyles/styledPageDiv';
import FrontPageSection from '#containers/FrontPageSection';
import idxPageDataPropTypes from './idxPageDataPropTypes';

const IdxPage = ({ pageData }) => {
  const groups = path(['content', 'groups'], pageData);

  return (
    <main role="main">
      <h1 id="content">IDX Page</h1>
      <StyledPageDiv>
        {groups.map((group, index) => (
          <Fragment key={group.title}>
            <FrontPageSection group={group} sectionNumber={index} />
          </Fragment>
        ))}
      </StyledPageDiv>
    </main>
  );
};

IdxPage.propTypes = {
  pageData: idxPageDataPropTypes.isRequired,
};

export default IdxPage;
