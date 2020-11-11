import React, { useContext } from 'react';
import { number, string, shape } from 'prop-types';
import styled from '@emotion/styled';

// Styling
import {
  GEL_SPACING,
  GEL_SPACING_DBL,
  GEL_SPACING_TRPL,
  GEL_SPACING_QUAD,
} from '@bbc/gel-foundations/spacings';
import {
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MAX,
} from '@bbc/gel-foundations/breakpoints';

// Contexts
import { RequestContext } from '#contexts/RequestContext';

// Utilities
import useToggle from '#hooks/useToggle';

// Components
import FrontPageSection from '../../components/FrontPageSection';

const createMarkup = oembed => {
  return { __html: oembed.html };
};

const StyledWrapper = styled.div`
  margin-top: ${GEL_SPACING};
  margin-bottom: ${GEL_SPACING_TRPL};

  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    margin-top: ${GEL_SPACING_QUAD};
  }

  @media (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
    padding-left: ${GEL_SPACING_DBL};
    padding-right: ${GEL_SPACING_DBL};
  }
`;

const USElectionBanner = ({ oembed }) => {
  const { isAmp } = useContext(RequestContext);
  const { enabled } = useToggle('us2020ElectionBanner');

  if (!enabled || !oembed || isAmp) return null;

  return (
    <FrontPageSection data-e2e="us-election-banner">
      <StyledWrapper dangerouslySetInnerHTML={createMarkup(oembed)} />
    </FrontPageSection>
  );
};

USElectionBanner.propTypes = {
  oembed: shape({
    version: string,
    type: string,
    width: number,
    height: number,
    html: string.isRequired,
  }),
};

USElectionBanner.defaultProps = {
  oembed: null,
};

export default USElectionBanner;
