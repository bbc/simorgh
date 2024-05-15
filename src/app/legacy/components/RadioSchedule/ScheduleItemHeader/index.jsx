import React, { useContext } from 'react';
import styled from '@emotion/styled';
import pathOr from 'ramda/src/pathOr';
import { formatUnixTimestamp } from '#psammead/psammead-timestamp-container/src/utilities';
import detokenise from '#psammead/psammead-detokeniser/src';
import LiveLabel from '#app/components/LiveLabel';
import { Link } from '#psammead/psammead-story-promo/src';
import {
  getSansBold,
  getSansRegular,
} from '#psammead/psammead-styles/src/font-styles';
import { getPica } from '#psammead/gel-foundations/src/typography';
import { GEL_SPACING } from '#psammead/gel-foundations/src/spacings';
import useClickTrackerHandler from '#app/hooks/useClickTrackerHandler';
import VisuallyHiddenText from '../../../../components/VisuallyHiddenText';
import { ServiceContext } from '../../../../contexts/ServiceContext';
import durationDictionary, { programStateConfig } from '../utilities';

const TitleWrapper = styled.span`
  color: ${({ titleColor }) => titleColor};
  padding: ${GEL_SPACING} 0 0 0;
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
  color: ${props => props.theme.palette.POSTBOX};
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
  id = '1',
  ...props
}) => {
  const {
    linkComponent = 'a',
    linkComponentAttr = 'href',
    durationLabel,
  } = props;
  const { script, locale, service, timezone, dir, translations } =
    useContext(ServiceContext);
  const nextLabel = pathOr('NEXT', ['media', 'nextLabel'], translations);
  const isLive = state === 'live';
  const isNext = state === 'next';
  const eventTrackingData = {
    componentName: `radio-schedule-${state}`,
  };
  const clickTrackerHandler = useClickTrackerHandler(eventTrackingData);
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

  // If state is live, we want the screenreader text to be dealt with by the LiveLabel
  const listenLabelTranslations = {
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

  const listenLabel = listenLabelTranslations[state];

  const content = (
    // This is a temporary fix for the a11y nested span's bug experienced in TalkBack, refer to the following issue: https://github.com/bbc/simorgh/issues/9652
    // eslint-disable-next-line jsx-a11y/aria-role
    <span role="text" id={`scheduleItem-${id}`}>
      {/* VisuallyHiddenText outside of the Live Label is only present if the state is not live */}
      {listenLabel && (
        <VisuallyHiddenText>{`${listenLabel}, `}</VisuallyHiddenText>
      )}
      {isLive && <LiveLabel offScreenText={`${listenLive}, `} />}
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
      <VisuallyHiddenText>{`, ${formattedStartTime}, `}</VisuallyHiddenText>
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
    <StyledLink
      // This is a temporary fix for the a11y nested span's bug experienced in TalkBack, refer to the following issue: https://github.com/bbc/simorgh/issues/9652
      aria-labelledby={`scheduleItem-${id}`}
      as={linkComponent}
      {...linkProps}
      className="focusIndicatorDisplayBlock"
      onClick={clickTrackerHandler}
    >
      {content}
    </StyledLink>
  );
};

export default ScheduleItemHeader;
