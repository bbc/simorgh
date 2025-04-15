import React, { useContext } from 'react';
import styled from '@emotion/styled';
import { Headline } from '#psammead/psammead-headings/src';
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
import VisuallyHiddenText from '../../../components/VisuallyHiddenText';
import { ServiceContext } from '../../../contexts/ServiceContext';

const BrandTitle = styled.span`
  display: block;
  line-height: 1;
  width: 100%;
  padding-bottom: ${({ theme }) => `${theme.spacings.FULL}rem`};
  word-break: break-word;
  ${({ script, theme }) => (theme.isDarkUi ? '' : script && getParagon(script))}
  ${MEDIA_QUERY_TYPOGRAPHY.LAPTOP_AND_LARGER} {
    padding-bottom: ${({ theme }) => `${theme.spacings.DOUBLE}rem`};
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
    line-height: ${({ theme }) => `${theme.spacings.TRIPLE}rem`};
  }
  ${MEDIA_QUERY_TYPOGRAPHY.LAPTOP_AND_LARGER} {
    font-size: ${({ theme }) => `${theme.spacings.TRIPLE}rem`};
    line-height: 1.75rem;
  }
`;

const OnDemandHeadingContainer = ({
  idAttr = null,
  brandTitle,
  releaseDateTimeStamp,
  episodeTitle = '',
  ariaHidden = false,
  className = '',
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
      {...(className ? { className } : undefined)}
      {...(idAttr === 'content' && { tabIndex: '-1' })}
      {...(ariaHidden && { as: 'strong', 'aria-hidden': 'true' })}
    >
      <TextWrapper {...(ariaHidden ? {} : { role: 'text' })}>
        <BrandTitle script={script} data-testid="brand-title">
          {brandTitle}
        </BrandTitle>
        <VisuallyHiddenText>, </VisuallyHiddenText>
        <Subheading script={script} service={service} data-testid="sub-heading">
          {episodeTitle || formattedTimestamp}
        </Subheading>
      </TextWrapper>
    </Headline>
  );
};

export default OnDemandHeadingContainer;
