import React, { Fragment, useContext } from 'react';
import path from 'ramda/src/path';
import IndexHeading from '#containers/IndexHeading';
import IndexPageContainer from '#app/components/PageLayout/IndexPageContainer';
import FrontPageSection from '#containers/FrontPageSection';
import idxPageDataPropTypes from '#models/propTypes/idxPage';
import { ServiceContext } from '#contexts/ServiceContext';

const IdxPage = ({ pageData }) => {
  const { script, service, dir } = useContext(ServiceContext);
  const groups = path(['content', 'groups'], pageData);
  const heading = path(['metadata', 'title'], pageData);

  return (
    <main role="main">
      <IndexPageContainer>
        <IndexHeading id="content" script={script} service={service} dir={dir}>
          {heading}
        </IndexHeading>
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
