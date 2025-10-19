import React, { use } from 'react';
import styled from '@emotion/styled';
import { Headline } from '#psammead/psammead-headings/src';
import {
  MEDIA_QUERY_TYPOGRAPHY,
  GEL_GROUP_2_SCREEN_WIDTH_MAX,
  GEL_GROUP_1_SCREEN_WIDTH_MIN,
} from '#psammead/gel-foundations/src/breakpoints';
import { formatUnixTimestamp } from '#psammead/psammead-timestamp-container/src/utilities';
import VisuallyHiddenText from '../../../components/VisuallyHiddenText';
import { ServiceContext } from '../../../contexts/ServiceContext';

const BrandTitle = styled.span`
  display: block;
  line-height: 1;
  width: 100%;
  padding-bottom: ${({ theme }) => `${theme.spacings.FULL}rem`};
  word-break: break-word;
  ${({ theme }) => (theme.isDarkUi ? '' : theme.fontSizes.paragon)};
  ${MEDIA_QUERY_TYPOGRAPHY.LAPTOP_AND_LARGER} {
    padding-bottom: ${({ theme }) => `${theme.spacings.DOUBLE}rem`};
    word-break: break-word;
    line-height: 1.09;
  }
`;

const Subheading = styled.span`
  display: inline-block;
  margin: 0;
  ${({ theme: { fontSizes } }) => fontSizes.doublePica};
  ${({ theme: { fontVariants } }) => fontVariants.sansRegular};
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
  idAttr = '',
  brandTitle,
  releaseDateTimeStamp,
  episodeTitle = '',
  ariaHidden = false,
  className = '',
}) => {
  const { timezone, datetimeLocale } = use(ServiceContext);

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
      {...(idAttr && { id: idAttr })}
      {...(className ? { className } : undefined)}
      {...(idAttr === 'content' && { tabIndex: '-1' })}
      {...(ariaHidden && { as: 'strong', 'aria-hidden': 'true' })}
    >
      <TextWrapper {...(ariaHidden ? {} : { role: 'text' })}>
        <BrandTitle data-testid="brand-title">{brandTitle}</BrandTitle>
        <VisuallyHiddenText>, </VisuallyHiddenText>
        <Subheading data-testid="sub-heading">
          {episodeTitle || formattedTimestamp}
        </Subheading>
      </TextWrapper>
    </Headline>
  );
};

export default OnDemandHeadingContainer;
