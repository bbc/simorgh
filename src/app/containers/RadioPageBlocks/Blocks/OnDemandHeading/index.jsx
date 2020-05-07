import React, { useContext } from 'react';
import { string } from 'prop-types';
import { C_SHADOW } from '@bbc/psammead-styles/colours';
import styled from 'styled-components';
import { Headline } from '@bbc/psammead-headings';
import VisuallyHiddenText from '@bbc/psammead-visually-hidden-text';
import {
  GEL_SPACING_QUAD,
  GEL_SPACING,
  GEL_SPACING_TRPL,
} from '@bbc/gel-foundations/spacings';
import { MEDIA_QUERY_TYPOGRAPHY } from '@bbc/gel-foundations/breakpoints';
import { formatUnixTimestamp } from '@bbc/psammead-timestamp-container/utilities';
import { getBodyCopy } from '@bbc/gel-foundations/typography';
import { getSansRegular } from '@bbc/psammead-styles/font-styles';
import { ServiceContext } from '#contexts/ServiceContext';

const StyledHeadline = styled(Headline)`
  @media (min-width: 1px) {
    padding: ${GEL_SPACING_QUAD} 0 ${GEL_SPACING_TRPL};
  }
`;

const BrandTitle = styled.span`
  display: block;
  padding-bottom: ${GEL_SPACING};
  ${MEDIA_QUERY_TYPOGRAPHY.LAPTOP_AND_LARGER} {
    padding-bottom: 0;
  }
`;

const Datestamp = styled.span`
  ${({ script }) => script && getBodyCopy(script)};
  ${({ service }) => getSansRegular(service)};
  color: ${C_SHADOW};
  /* padding-bottom: ${GEL_SPACING_TRPL}; */
  margin: 0; /* Reset */
`;

const HeadingContainer = ({ idAttr, brandTitle, releaseDateTimeStamp }) => {
  const { script, service, timezone, locale } = useContext(ServiceContext);

  const formattedTimestamp = formatUnixTimestamp({
    releaseDateTimeStamp,
    format: 'LL',
    timezone,
    locale,
    isRelative: false,
  });

  return (
    <StyledHeadline script={script} service={service} id={idAttr} tabIndex="-1">
      <span
        // eslint-disable-next-line jsx-a11y/aria-role
        role="text"
      >
        <BrandTitle>{brandTitle}</BrandTitle>
        <VisuallyHiddenText tabIndex="-1">, </VisuallyHiddenText>
        <Datestamp
          script={script}
          service={service}
          releaseDateTimeStamp={releaseDateTimeStamp}
        >
          {formattedTimestamp}
        </Datestamp>
      </span>
    </StyledHeadline>
  );
};

HeadingContainer.propTypes = {
  idAttr: string,
  brandTitle: string.isRequired,
  releaseDateTimeStamp: string.isRequired,
};

HeadingContainer.defaultProps = {
  idAttr: null,
};

export default HeadingContainer;
