import React, { useContext } from 'react';
import styled from 'styled-components';
import { string, number } from 'prop-types';
import { C_SHADOW } from '@bbc/psammead-styles/colours';
import { GEL_SPACING_TRPL } from '@bbc/gel-foundations/spacings';
import { getBodyCopy } from '@bbc/gel-foundations/typography';
import { getSansRegular } from '@bbc/psammead-styles/font-styles';
import { formatUnixTimestamp } from '@bbc/psammead-timestamp-container/utilities';
import { ServiceContext } from '#contexts/ServiceContext';

const StyledDatestamp = styled.span`
  ${({ script }) => script && getBodyCopy(script)};
  ${({ service }) => getSansRegular(service)};
  color: ${C_SHADOW};
  padding-bottom: ${GEL_SPACING_TRPL};
  margin: 0; /* Reset */
`;

const Datestamp = ({ idAttr, releaseDateTimeStamp }) => {
  const { script, service, timezone, locale } = useContext(ServiceContext);

  if (!releaseDateTimeStamp) return null;

  const formattedTimestamp = formatUnixTimestamp({
    releaseDateTimeStamp,
    format: 'LL',
    timezone,
    locale,
    isRelative: false,
  });

  return (
    <StyledDatestamp script={script} service={service} id={idAttr}>
      {formattedTimestamp}
    </StyledDatestamp>
  );
};

Datestamp.propTypes = {
  idAttr: string,
  releaseDateTimeStamp: number.isRequired,
};

Datestamp.defaultProps = {
  idAttr: null,
};

export default Datestamp;
