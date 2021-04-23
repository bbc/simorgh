import React from 'react';
import styled from '@emotion/styled';
import { oneOfType, elementType, shape, string, number } from 'prop-types';
import VisuallyHiddenText from '@bbc/psammead-visually-hidden-text';
import { formatUnixTimestamp } from '@bbc/psammead-timestamp-container/utilities';
import detokenise from '@bbc/psammead-detokeniser';
import LiveLabel from '@bbc/psammead-live-label';
import { scriptPropType } from '@bbc/gel-foundations/prop-types';
import { Link } from '@bbc/psammead-story-promo';
import { getSansBold, getSansRegular } from '@bbc/psammead-styles/font-styles';
import { getPica } from '@bbc/gel-foundations/typography';
import { C_KINGFISHER } from '@bbc/psammead-styles/colours';
import { GEL_SPACING } from '@bbc/gel-foundations/spacings';
import durationDictionary, { programStateConfig } from '../utilities';

const TitleWrapper = styled.span`
  color: ${({ titleColor }) => titleColor};
  padding: ${GEL_SPACING} 0;
  display: inline-block;
  width: 100%;
  ${({ service }) => service && getSansRegular(service)}
  ${({ script }) => script && getPica(script)}
`;

const StyledLink = styled(Link)`
  &:hover ${TitleWrapper} {
    text-decoration: underline;
  }

  &:focus ${TitleWrapper} {
    text-decoration: underline;
  }
`;

const NextLabel = styled.span`
  ${({ service }) => service && getSansBold(service)}
  ${({ script }) => script && getPica(script)}
  color: ${C_KINGFISHER};
  display: inline-block;

  ${({ dir }) =>
    dir === 'rtl'
      ? `margin-left: ${GEL_SPACING};`
      : `margin-right: ${GEL_SPACING};`}
`;

const ScheduleItemHeader = ({
  dir,
  state,
  link,
  brandTitle,
  startTime,
  duration,
  ...props
}) => {
  const {
    nextLabel,
    liveLabel,
    listenLabelTranslations,
    service,
    script,
    timezone,
    locale,
    linkComponent,
    linkComponentAttr,
    durationLabel,
  } = props;

  const isLive = state === 'live';
  const isNext = state === 'next';

  const formattedStartTime = formatUnixTimestamp({
    timestamp: startTime,
    format: 'HH:mm',
    timezone,
    locale,
    isRelative: false,
  });

  const formattedDuration = detokenise(
    durationLabel,
    durationDictionary({ duration, locale }),
  );

  const episodeTitle = formatUnixTimestamp({
    timestamp: startTime,
    format: 'LL',
    timezone,
    locale,
    isRelative: false,
  });

  const content = (
    // eslint-disable-next-line jsx-a11y/aria-role
    <span role="text">
      <VisuallyHiddenText>{`${listenLabelTranslations[state]}, `}</VisuallyHiddenText>
      {isLive && (
        <LiveLabel
          service={service}
          dir={dir}
          liveText={liveLabel}
          ariaHidden
        />
      )}
      {isNext && (
        <NextLabel
          aria-hidden="true"
          service={service}
          script={script}
          dir={dir}
        >
          {`${nextLabel} `}
        </NextLabel>
      )}
      {brandTitle}
      <VisuallyHiddenText>, {formattedStartTime}, </VisuallyHiddenText>
      <TitleWrapper
        service={service}
        script={script}
        {...programStateConfig[state]}
      >
        {episodeTitle}
      </TitleWrapper>
      <VisuallyHiddenText>{`, ${formattedDuration} `}</VisuallyHiddenText>
    </span>
  );

  const linkProps = { [linkComponentAttr]: link };

  return state === 'next' ? (
    content
  ) : (
    <StyledLink as={linkComponent} {...linkProps}>
      {content}
    </StyledLink>
  );
};

ScheduleItemHeader.propTypes = {
  service: string.isRequired,
  dir: string.isRequired,
  script: shape(scriptPropType).isRequired,
  brandTitle: string.isRequired,
  link: string.isRequired,
  state: string.isRequired,
  nextLabel: string.isRequired,
  liveLabel: string.isRequired,
  listenLabelTranslations: shape({
    live: string.isRequired,
    next: string.isRequired,
    onDemand: string.isRequired,
  }).isRequired,
  startTime: number.isRequired,
  durationLabel: string.isRequired,
  duration: string.isRequired,
  timezone: string,
  locale: string,
  linkComponent: oneOfType([elementType, string]),
  linkComponentAttr: string,
};

ScheduleItemHeader.defaultProps = {
  timezone: 'Europe/London',
  locale: 'en-gb',
  linkComponent: 'a',
  linkComponentAttr: 'href',
};

export default ScheduleItemHeader;
