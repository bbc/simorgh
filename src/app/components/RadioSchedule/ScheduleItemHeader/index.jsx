import React, { useContext } from 'react';
import styled from '@emotion/styled';
import pathOr from 'ramda/src/pathOr';
import { oneOfType, elementType, string, number } from 'prop-types';
import VisuallyHiddenText from '@bbc/psammead-visually-hidden-text';
import { formatUnixTimestamp } from '@bbc/psammead-timestamp-container/utilities';
import detokenise from '@bbc/psammead-detokeniser';
import LiveLabel from '@bbc/psammead-live-label';
import { Link } from '@bbc/psammead-story-promo';
import { getSansBold, getSansRegular } from '@bbc/psammead-styles/font-styles';
import { getPica } from '@bbc/gel-foundations/typography';
import { C_KINGFISHER } from '@bbc/psammead-styles/colours';
import { GEL_SPACING } from '@bbc/gel-foundations/spacings';
import durationDictionary, { programStateConfig } from '../utilities';
import { ServiceContext } from '#contexts/ServiceContext';

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
  state,
  link,
  brandTitle,
  startTime,
  duration,
  ...props
}) => {
  const { linkComponent, linkComponentAttr, durationLabel } = props;

  const { script, locale, service, timezone, dir, translations } = useContext(
    ServiceContext,
  );

  const liveLabel = pathOr('LIVE', ['media', 'liveLabel'], translations);
  const nextLabel = pathOr('NEXT', ['media', 'nextLabel'], translations);

  const isLive = state === 'live';
  const isNext = state === 'next';

  const listenLive = pathOr(
    'Listen Live',
    ['media', 'listenLive'],
    translations,
  );
  const listen = pathOr('Listen', ['media', 'listen'], translations);
  const listenNext = pathOr(
    'Listen Next',
    ['media', 'listenNext'],
    translations,
  );

  const listenLabelTranslations = {
    live: listenLive,
    next: listenNext,
    onDemand: listen,
  };

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
  brandTitle: string.isRequired,
  link: string.isRequired,
  state: string.isRequired,
  startTime: number.isRequired,
  durationLabel: string.isRequired,
  duration: string.isRequired,
  linkComponent: oneOfType([elementType, string]),
  linkComponentAttr: string,
};

ScheduleItemHeader.defaultProps = {
  linkComponent: 'a',
  linkComponentAttr: 'href',
};

export default ScheduleItemHeader;
