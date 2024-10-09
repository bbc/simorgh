import React, { useContext } from 'react';
import styled from '@emotion/styled';
import { mediaIcons } from '#psammead/psammead-assets/src/svgs';
import {
  GEL_SPACING,
  GEL_SPACING_DBL,
} from '#psammead/gel-foundations/src/spacings';
import {
  getSansRegular,
  getSerifMedium,
} from '#psammead/psammead-styles/src/font-styles';
import {
  getBrevier,
  getMinion,
  getPica,
} from '#psammead/gel-foundations/src/typography';
import { formatDuration } from '#psammead/psammead-timestamp-container/src/utilities';
import { ServiceContext } from '../../../../contexts/ServiceContext';
import ScheduleItemHeader from '../ScheduleItemHeader';
import { programStateConfig } from '../utilities';

const CardWrapper = styled.div`
  padding-top: ${GEL_SPACING};
  background-color: ${props => props.theme.palette.WHITE};
  display: flex;
  flex-direction: column;
  outline: 0.0625rem solid transparent;
  height: 100%;
`;

const TextWrapper = styled.div`
  padding: 0 ${GEL_SPACING};
  flex-grow: 1;
`;

const StyledH3 = styled.h3`
  ${({ service }) => service && getSerifMedium(service)}
  ${({ script }) => script && getPica(script)}
  color: ${({ headerTextColor }) => headerTextColor};
  margin: 0; /* Reset */
`;

const SummaryWrapper = styled.p`
  ${({ service }) => service && getSansRegular(service)}
  ${({ script }) => script && getBrevier(script)}
  color: ${props => props.theme.palette.METAL};
  padding-top: ${GEL_SPACING};
  padding-bottom: ${GEL_SPACING_DBL};
  margin: 0; /* Reset */
`;

const ButtonWrapper = styled.div`
  ${({ service }) => service && getSansRegular(service)}
  ${({ script }) => script && getMinion(script)}
  padding: ${GEL_SPACING};
  background-color: ${({ backgroundColor }) => backgroundColor};
  outline: 0.0625rem solid transparent;
  color: ${({ durationColor }) => durationColor};
  @media screen and (-ms-high-contrast: active) {
    background-color: transparent;
    outline: none;
  }
`;

const IconWrapper = styled.span`
  > svg {
    color: ${({ durationColor }) => durationColor};
    fill: currentColor;
    width: 1.0625rem;
    height: 0.75rem;
    margin: 0;
    @media screen and (forced-colors: active) {
      fill: canvasText;
    }
  }
`;

const DurationWrapper = styled.time`
  ${({ dir }) =>
    dir === 'ltr'
      ? `padding-left: ${GEL_SPACING};`
      : `padding-right: ${GEL_SPACING};`}
`;

const ProgramCard = ({ program, id, ...props }) => {
  const { service, script, locale, dir } = useContext(ServiceContext);
  const { state, startTime, link, brandTitle, summary, duration } = program;
  return (
    <CardWrapper>
      <TextWrapper>
        <StyledH3
          service={service}
          script={script}
          {...programStateConfig[state]}
        >
          <ScheduleItemHeader
            {...props}
            state={state}
            link={link}
            brandTitle={brandTitle}
            startTime={startTime}
            duration={duration}
            // This is a temporary fix for the a11y nested span's bug experienced in TalkBack, refer to the following issue: https://github.com/bbc/simorgh/issues/9652
            id={id}
          />
        </StyledH3>
        {summary && (
          <SummaryWrapper service={service} script={script}>
            {summary}
          </SummaryWrapper>
        )}
      </TextWrapper>
      <ButtonWrapper
        service={service}
        script={script}
        {...programStateConfig[state]}
      >
        <IconWrapper {...programStateConfig[state]}>
          {mediaIcons.audio}
        </IconWrapper>
        <DurationWrapper dir={dir} dateTime={duration} suppressHydrationWarning>
          <span aria-hidden="true">{formatDuration({ duration, locale })}</span>
        </DurationWrapper>
      </ButtonWrapper>
    </CardWrapper>
  );
};

export default ProgramCard;
