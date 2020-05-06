import React, { useContext } from 'react';
import styled from 'styled-components';
import { string } from 'prop-types';
import { C_SHADOW } from '@bbc/psammead-styles/colours';
import { GEL_SPACING_TRPL } from '@bbc/gel-foundations/spacings';
import { getBodyCopy } from '@bbc/gel-foundations/typography';
import { getSansRegular } from '@bbc/psammead-styles/font-styles';
import { Headline } from '@bbc/psammead-headings';
import { formatUnixTimestamp } from '@bbc/psammead-timestamp-container/utilities';
import { ServiceContext } from '#contexts/ServiceContext';

const StyledDatestamp = styled.span`
  ${({ script }) => script && getBodyCopy(script)};
  ${({ service }) => getSansRegular(service)};
  color: ${C_SHADOW};
  padding-bottom: ${GEL_SPACING_TRPL};
  margin: 0; /* Reset */
`;

const HeadingContainer = ({ idAttr, brandTitle, releaseDateTimeStamp }) => {
  const { script, service, timezone, locale } = useContext(ServiceContext);

  // if (!brandTitle) return null;

  const formattedTimestamp = formatUnixTimestamp({
    timestamp: releaseDateTimeStamp,
    format: 'LL',
    timezone,
    locale,
    isRelative: false,
  });

  return (
    <Headline script={script} service={service} id={idAttr} tabIndex="-1">
      <span
        // eslint-disable-next-line jsx-a11y/aria-role
        role="text"
      >
        {/* <Headline>{brandTitle}</Headline> */}
        <span>{brandTitle}</span>
        {/* <DatestampBlock timestamp={releaseDateTimeStamp} /> */}
        <StyledDatestamp script={script} service={service}>
          {formattedTimestamp}
        </StyledDatestamp>
      </span>
    </Headline>
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
