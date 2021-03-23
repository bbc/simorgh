import React, { useContext } from 'react';
import styled from '@emotion/styled';
import { mediaIcons } from '@bbc/psammead-assets/svgs';
import { GEL_SPACING, GEL_SPACING_DBL } from '@bbc/gel-foundations/spacings';
import { C_METAL, C_WHITE } from '@bbc/psammead-styles/colours';
import {
  getSansRegular,
  getSerifMedium,
} from '@bbc/psammead-styles/font-styles';
import {
  getBrevier,
  getMinion,
  getPica,
} from '@bbc/gel-foundations/typography';
import { shape, string, number } from 'prop-types';
import { formatDuration } from '@bbc/psammead-timestamp-container/utilities';
import ScheduleItemHeader from '../ScheduleItemHeader';
import programStateConfig from '../utilities/programStateConfig';
import { ServiceContext } from '#contexts/ServiceContext';

const CardWrapper = styled.div`
  padding-top: ${GEL_SPACING};
  background-color: ${C_WHITE};
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
  color: ${C_METAL};
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
  }
`;

const DurationWrapper = styled.time`
  ${({ dir }) =>
    dir === 'ltr'
      ? `padding-left: ${GEL_SPACING};`
      : `padding-right: ${GEL_SPACING};`}
`;

const ProgramCard = ({ program, ...props }) => {
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
        <DurationWrapper dir={dir} dateTime={duration}>
          <span aria-hidden="true">{formatDuration({ duration, locale })}</span>
        </DurationWrapper>
      </ButtonWrapper>
    </CardWrapper>
  );
};

ProgramCard.propTypes = {
  program: shape({
    state: string.isRequired,
    duration: string.isRequired,
    startTime: number.isRequired,
    summary: string,
    link: string.isRequired,
    brandTitle: string.isRequired,
  }).isRequired,
};

export default ProgramCard;
