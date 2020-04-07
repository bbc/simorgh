import React, { useContext } from 'react';
import styled from 'styled-components';
import { shape, string } from 'prop-types';
import {
  GEL_GROUP_1_SCREEN_WIDTH_MAX,
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MAX,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MAX,
  GEL_GROUP_5_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';
import {
  GEL_MARGIN_ABOVE_400PX,
  GEL_MARGIN_BELOW_400PX,
  GEL_SPACING_DBL,
  GEL_SPACING_TRPL,
  GEL_SPACING_QUAD,
  GEL_SPACING_QUIN,
} from '@bbc/gel-foundations/spacings';
import { C_METAL } from '@bbc/psammead-styles/colours';
import { getCanon } from '@bbc/gel-foundations/typography';
import { getSansRegular } from '@bbc/psammead-styles/font-styles';
import { ServiceContext } from '#contexts/ServiceContext';
import MostReadContainer from '#containers/MostRead';
import ATIAnalytics from '#containers/ATIAnalytics';
import ChartbeatAnalytics from '#containers/ChartbeatAnalytics';
import MetadataContainer from '#containers/Metadata';

const StyledMain = styled.main`
  flex-grow: 1;
  @media (max-width: ${GEL_GROUP_1_SCREEN_WIDTH_MAX}) {
    margin: 0 ${GEL_MARGIN_BELOW_400PX} ${GEL_SPACING_TRPL};
  }
  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
    margin: 0 ${GEL_MARGIN_ABOVE_400PX} ${GEL_SPACING_QUAD};
  }
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_4_SCREEN_WIDTH_MAX}) {
    margin: 0 ${GEL_MARGIN_ABOVE_400PX} ${GEL_SPACING_QUIN};
  }
  @media (min-width: ${GEL_GROUP_5_SCREEN_WIDTH_MIN}) {
    width: 100%; /* Needed for IE11 */
    margin: 0 auto ${GEL_SPACING_TRPL};
    padding: 0 ${GEL_SPACING_DBL};
    max-width: ${GEL_GROUP_5_SCREEN_WIDTH_MIN};
  }
`;

const HeadingOne = styled.h1`
  color: ${C_METAL};
  ${({ script }) => script && getCanon(script)};
  ${({ service }) => getSansRegular(service)};
`;

const MostReadPage = ({ pageData, mostReadEndpointOverride }) => {
  const {
    service,
    script,
    dir,
    lang,
    mostRead: { header },
  } = useContext(ServiceContext);

  const MostReadWrapper = ({ children }) => (
    <>
      <HeadingOne id="content" tabindex="-1" script={script} service={service}>
        {header}
      </HeadingOne>
      {children}
    </>
  );

  return (
    <>
      <ATIAnalytics data={pageData} />
      <ChartbeatAnalytics data={pageData} />
      <MetadataContainer
        title={header}
        lang={lang}
        description="mostread"
        openGraphType="website"
      />
      <StyledMain role="main" dir={dir}>
        <MostReadContainer
          mostReadEndpointOverride={mostReadEndpointOverride}
          wrapper={MostReadWrapper}
          maxTwoColumns
          initialData={pageData}
        />
      </StyledMain>
    </>
  );
};

MostReadPage.propTypes = {
  pageData: shape({}),
  mostReadEndpointOverride: string,
};

MostReadPage.defaultProps = {
  mostReadEndpointOverride: null,
};

export default MostReadPage;
