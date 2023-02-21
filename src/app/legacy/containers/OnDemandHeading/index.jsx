import React, { useContext } from 'react';
import { string, number, bool } from 'prop-types';
import styled from '@emotion/styled';
import { Headline } from '#psammead/psammead-headings/src';
import VisuallyHiddenText from '#psammead/psammead-visually-hidden-text/src';
import {
  GEL_SPACING,
  GEL_SPACING_DBL,
  GEL_SPACING_TRPL,
} from '#psammead/gel-foundations/src/spacings';
import {
  MEDIA_QUERY_TYPOGRAPHY,
  GEL_GROUP_2_SCREEN_WIDTH_MAX,
  GEL_GROUP_1_SCREEN_WIDTH_MIN,
} from '#psammead/gel-foundations/src/breakpoints';
import { formatUnixTimestamp } from '#psammead/psammead-timestamp-container/src/utilities';
import {
  getDoublePica,
  getParagon,
} from '#psammead/gel-foundations/src/typography';
import { getSansRegular } from '#psammead/psammead-styles/src/font-styles';
import { ServiceContext } from '../../../contexts/ServiceContext';

const BrandTitle = styled.span`
  display: block;
  line-height: 1;
  width: 100%;
  padding-bottom: ${GEL_SPACING};
  word-break: break-word;
  ${({ script, darkMode }) => (darkMode ? '' : script && getParagon(script))}
  ${MEDIA_QUERY_TYPOGRAPHY.LAPTOP_AND_LARGER} {
    padding-bottom: ${GEL_SPACING_DBL};
    word-break: break-word;
    line-height: 1.09;
  }
`;

const Subheading = styled.span`
  display: inline-block;
  margin: 0;
  ${({ script }) => script && getDoublePica(script)}
  ${({ service }) => getSansRegular(service)}
  @media (max-width: 22.5rem) and (min-width: ${GEL_GROUP_1_SCREEN_WIDTH_MIN}) {
    font-size: 1.125rem;
    line-height: 1.375rem;
  }
  @media (max-width: ${GEL_GROUP_2_SCREEN_WIDTH_MAX}) {
    font-size: 1.25rem;
    line-height: ${GEL_SPACING_TRPL};
  }
  ${MEDIA_QUERY_TYPOGRAPHY.LAPTOP_AND_LARGER} {
    font-size: ${GEL_SPACING_TRPL};
    line-height: 1.75rem;
  }
`;

const OnDemandHeadingContainer = ({
  idAttr,
  brandTitle,
  releaseDateTimeStamp,
  episodeTitle,
  ariaHidden,
  darkMode,
  className,
}) => {
  const { script, service, timezone, datetimeLocale } =
    useContext(ServiceContext);

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
        <BrandTitle script={script} darkMode={darkMode}>
          {brandTitle}
        </BrandTitle>
        <VisuallyHiddenText>, </VisuallyHiddenText>
        <Subheading script={script} service={service}>
          {episodeTitle || formattedTimestamp}
        </Subheading>
      </TextWrapper>
    </Headline>
  );
};

OnDemandHeadingContainer.propTypes = {
  idAttr: string,
  brandTitle: string.isRequired,
  releaseDateTimeStamp: number.isRequired,
  episodeTitle: string,
  ariaHidden: bool,
  darkMode: bool,
  className: string,
};

OnDemandHeadingContainer.defaultProps = {
  idAttr: null,
  episodeTitle: null,
  ariaHidden: false,
  darkMode: false,
  className: '',
};

export default OnDemandHeadingContainer;
