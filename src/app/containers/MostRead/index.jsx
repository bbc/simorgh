import React, { useContext } from 'react';
import { bool, string } from 'prop-types';
import styled from 'styled-components';
import {
  GEL_GROUP_1_SCREEN_WIDTH_MAX,
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
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
import SectionLabel from '@bbc/psammead-section-label';
import { RequestContext } from '#contexts/RequestContext';
import { ServiceContext } from '#contexts/ServiceContext';
import useToggle from '../Toggle/useToggle';
import Amp from './Amp';
import Canonical from './Canonical';

const getMostReadEndpoint = ({ service, variant }) =>
  variant
    ? `/${service}/mostread/${variant}.json`
    : `/${service}/mostread.json`;

const MostReadContainer = ({
  mostReadEndpointOverride,
  maxTwoColumns,
  constrainMaxWidth,
  isOnFrontPage,
}) => {
  const { variant, isAmp } = useContext(RequestContext);
  const {
    service,
    mostRead: { hasMostRead, header },
    script,
    dir,
  } = useContext(ServiceContext);

  const { enabled } = useToggle('mostRead');

  const mostReadEnabled = enabled && hasMostRead;

  if (!mostReadEnabled) {
    return null;
  }

  const StyledMostRead = isOnFrontPage
    ? FrontPageMostReadSection
    : MostReadSection;

  const MostReadSectionWrapper = constrainMaxWidth
    ? ConstrainedMostReadSection
    : StyledMostRead;

  const MostReadComponent = isAmp ? Amp : Canonical;

  const endpoint =
    mostReadEndpointOverride || getMostReadEndpoint({ service, variant });

  return (
    <MostReadSectionWrapper>
      <SectionLabel
        script={script}
        labelId="Most-Read"
        service={service}
        dir={dir}
      >
        {header}
      </SectionLabel>
      <MarginWrapper>
        <MostReadComponent
          endpoint={endpoint}
          constrainMaxWidth={constrainMaxWidth}
          maxTwoColumns={maxTwoColumns}
          isOnFrontPage={isOnFrontPage}
        />
      </MarginWrapper>
    </MostReadSectionWrapper>
  );
};

MostReadContainer.propTypes = {
  mostReadEndpointOverride: string,
  constrainMaxWidth: bool,
  maxTwoColumns: bool,
  isOnFrontPage: bool,
};

MostReadContainer.defaultProps = {
  mostReadEndpointOverride: null,
  constrainMaxWidth: false,
  maxTwoColumns: true,
  isOnFrontPage: false,
};

export default MostReadContainer;

const MarginWrapper = styled.div`
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    margin-top: ${GEL_SPACING_DBL};
  }
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    margin-top: ${GEL_SPACING_TRPL};
  }
`;

const MostReadSection = styled.section.attrs(() => ({
  role: 'region',
  'aria-labelledby': 'Most-Read',
  'data-e2e': 'most-read',
}))``;

const FrontPageMostReadSection = styled(MostReadSection)`
  /* To centre page layout for Group 4+ */
  margin: 0 auto;
  width: 100%; /* Needed for IE11 */
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    max-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN};
  }
`;

const ConstrainedMostReadSection = styled(MostReadSection)`
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
