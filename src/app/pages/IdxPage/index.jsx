import React, { useContext } from 'react';
import { node, string } from 'prop-types';
import styled from 'styled-components';
import { GEL_GROUP_4_SCREEN_WIDTH_MIN } from '@bbc/gel-foundations/breakpoints';
import MostReadContainer, {
  MostReadSection,
  MostReadSectionLabel,
} from '#containers/MostRead';
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
    isOnIdxPage
    mostReadEndpointOverride={mostReadEndpointOverride}
    columnLayout="twoColumn"
    wrapper={MostReadWrapper}
  />
);

MostReadWrapper.propTypes = {
  children: node.isRequired,
};

const IdxPage = ({ mostReadEndpointOverride }) => {
  const {
    mostRead: { onIdxPage },
  } = useContext(ServiceContext);

  return (
    <main role="main">
      <h1 id="content">IDX Page</h1>

      {onIdxPage && renderMostRead(mostReadEndpointOverride)}
    </main>
  );
};

IdxPage.propTypes = {
  mostReadEndpointOverride: string,
};

IdxPage.defaultProps = {
  mostReadEndpointOverride: null,
};

export default IdxPage;
