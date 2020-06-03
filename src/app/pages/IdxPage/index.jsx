import React, { Fragment } from 'react';
import path from 'ramda/src/path';
import IndexHeading from '#containers/IndexHeading';
import { IndexPageContainer } from '#lib/pageStyles/index';
import FrontPageSection from '#containers/FrontPageSection';
import idxPageDataPropTypes from '#models/propTypes/idxPage';

const IdxPage = ({ pageData }) => {
  const groups = path(['content', 'groups'], pageData);
  const heading = path(['metadata', 'title'], pageData);

  return (
    <main role="main">
      <IndexPageContainer>
        <IndexHeading id="content">{heading}</IndexHeading>
        {groups.map((group, index) => (
          <Fragment key={group.title}>
            <FrontPageSection group={group} sectionNumber={index} />
          </Fragment>
        ))}
      </IndexPageContainer>
    </main>
  );
};

IdxPage.propTypes = {
  pageData: idxPageDataPropTypes.isRequired,
};

export default IdxPage;
