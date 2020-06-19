import React, { useContext } from 'react';
import { string, number, bool } from 'prop-types';
import styled from 'styled-components';
import { Headline } from '@bbc/psammead-headings';
import VisuallyHiddenText from '@bbc/psammead-visually-hidden-text';
import {
  GEL_SPACING_QUAD,
  GEL_SPACING,
  GEL_SPACING_DBL,
  GEL_SPACING_SEPT,
} from '@bbc/gel-foundations/spacings';
import { MEDIA_QUERY_TYPOGRAPHY } from '@bbc/gel-foundations/breakpoints';
import { formatUnixTimestamp } from '@bbc/psammead-timestamp-container/utilities';
import { getDoublePica } from '@bbc/gel-foundations/typography';
import { getSansRegular } from '@bbc/psammead-styles/font-styles';
import { ServiceContext } from '#contexts/ServiceContext';

const StyledHeadline = styled(Headline)`
  @media screen {
    padding: ${GEL_SPACING_QUAD} 0 ${GEL_SPACING_DBL};
  }
`;

const BrandTitle = styled.span`
  display: inline-block;
  width: 100%;
  padding-bottom: ${GEL_SPACING};
  ${MEDIA_QUERY_TYPOGRAPHY.LAPTOP_AND_LARGER} {
    padding-bottom: 0;
    line-height: ${GEL_SPACING_SEPT};
  }
`;

const Datestamp = styled.span`
  ${({ script }) => script && getDoublePica(script)};
  ${({ service }) => getSansRegular(service)};
  margin: 0;
`;

const HeadingContainer = ({
  idAttr,
  brandTitle,
  releaseDateTimeStamp,
  ariaHidden,
}) => {
  const { script, service, timezone, locale } = useContext(ServiceContext);

  const formattedTimestamp = formatUnixTimestamp({
    timestamp: releaseDateTimeStamp,
    format: 'LL',
    timezone,
    locale,
    isRelative: false,
  });

  const TextWrapper = ariaHidden ? React.Fragment : 'span';

  return (
    <StyledHeadline
      script={script}
      service={service}
      id={idAttr}
      {...(idAttr === 'content' && { tabIndex: '-1' })}
      {...(ariaHidden && { as: 'strong', 'aria-hidden': 'true' })}
    >
      <TextWrapper {...(ariaHidden ? {} : { role: 'text' })}>
        <BrandTitle>{brandTitle}</BrandTitle>
        <VisuallyHiddenText>, </VisuallyHiddenText>
        <Datestamp script={script} service={service}>
          {formattedTimestamp}
        </Datestamp>
      </TextWrapper>
    </StyledHeadline>
  );
};

HeadingContainer.propTypes = {
  idAttr: string,
  brandTitle: string.isRequired,
  releaseDateTimeStamp: number.isRequired,
  ariaHidden: bool,
};

HeadingContainer.defaultProps = {
  idAttr: null,
  ariaHidden: false,
};

export default HeadingContainer;
