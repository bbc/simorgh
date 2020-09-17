import React, { useContext } from 'react';
import { string, number, bool } from 'prop-types';
import styled from 'styled-components';
import { Headline } from '@bbc/psammead-headings';
import VisuallyHiddenText from '@bbc/psammead-visually-hidden-text';
import { GEL_SPACING, GEL_SPACING_SEPT } from '@bbc/gel-foundations/spacings';
import { MEDIA_QUERY_TYPOGRAPHY } from '@bbc/gel-foundations/breakpoints';
import { formatUnixTimestamp } from '@bbc/psammead-timestamp-container/utilities';
import { getDoublePica } from '@bbc/gel-foundations/typography';
import { getSansRegular } from '@bbc/psammead-styles/font-styles';
import { ServiceContext } from '#contexts/ServiceContext';

const BrandTitle = styled.span`
  display: inline-block;
  width: 100%;
  padding-bottom: ${GEL_SPACING};
  word-break: break-word;
  ${MEDIA_QUERY_TYPOGRAPHY.LAPTOP_AND_LARGER} {
    padding-bottom: 0;
    word-break: break-word;
    line-height: ${GEL_SPACING_SEPT};
  }
`;

const Datestamp = styled.span`
  ${({ script }) => script && getDoublePica(script)};
  ${({ service }) => getSansRegular(service)};
  margin: 0;
`;

const OnDemandHeadingContainer = ({
  idAttr,
  brandTitle,
  releaseDateTimeStamp,
  ariaHidden,
  darkMode,
  className,
}) => {
  const { script, service, timezone, datetimeLocale } = useContext(
    ServiceContext,
  );

  const formattedTimestamp = formatUnixTimestamp({
    timestamp: releaseDateTimeStamp,
    format: 'LL',
    timezone,
    locale: datetimeLocale,
    isRelative: false,
  });

  const TextWrapper = ariaHidden ? React.Fragment : 'span';

  return (
    <Headline
      script={script}
      service={service}
      id={idAttr}
      darkMode={darkMode}
      className={className}
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
    </Headline>
  );
};

OnDemandHeadingContainer.propTypes = {
  idAttr: string,
  brandTitle: string.isRequired,
  releaseDateTimeStamp: number.isRequired,
  ariaHidden: bool,
  darkMode: bool,
  className: string,
};

OnDemandHeadingContainer.defaultProps = {
  idAttr: null,
  ariaHidden: false,
  darkMode: false,
  className: '',
};

export default OnDemandHeadingContainer;
