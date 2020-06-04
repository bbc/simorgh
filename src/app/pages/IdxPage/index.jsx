import React, { Fragment, useContext } from 'react';
import { node, string } from 'prop-types';
import styled from 'styled-components';
import path from 'ramda/src/path';
import { GEL_GROUP_4_SCREEN_WIDTH_MIN } from '@bbc/gel-foundations/breakpoints';
import IndexHeading from '#containers/IndexHeading';
import IndexPageContainer from '#app/components/PageLayout/IndexPageContainer';
import MostReadContainer from '#containers/MostRead';
import MostReadSection from '#containers/MostRead/section';
import MostReadSectionLabel from '#containers/MostRead/label';
import FrontPageSection from '#containers/FrontPageSection';
import idxPageDataPropTypes from '#models/propTypes/idxPage';
import { ServiceContext } from '#contexts/ServiceContext';

const IdxMostReadSection = styled(MostReadSection)`
  /* To centre page layout for Group 4+ */
  margin: 0 auto;
  width: 100%; /* Needed for IE11 */
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    max-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN};
  }
`;

const MostReadWrapper = ({ children }) => (
  <IdxMostReadSection>
    <MostReadSectionLabel />
    {children}
  </IdxMostReadSection>
);

const renderMostRead = mostReadEndpointOverride => (
  <MostReadContainer
    mostReadEndpointOverride={mostReadEndpointOverride}
    columnLayout="twoColumn"
    wrapper={MostReadWrapper}
  />
);

MostReadWrapper.propTypes = {
  children: node.isRequired,
};

const IdxPage = ({ pageData, mostReadEndpointOverride }) => {
  const {
    mostRead: { onIdxPage },
  } = useContext(ServiceContext);
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
        {onIdxPage && renderMostRead(mostReadEndpointOverride)}
      </IndexPageContainer>
    </main>
  );
};

IdxPage.propTypes = {
  pageData: idxPageDataPropTypes.isRequired,
  mostReadEndpointOverride: string,
};

IdxPage.defaultProps = {
  mostReadEndpointOverride: null,
};

export default IdxPage;
