import React from 'react';
import styled, { css } from '@bbc/web-styled';
import {
  GROUP_3,
  SPACING_6,
  SPACING_4,
  SPACING_2,
  SPACING_1,
  fontScaleBody,
  fontScaleDescription
} from '@bbc/web-gel-foundations';
import { isLiveStatus } from '@bbc/web-sport-utils';

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  ${fontScaleDescription}
  padding-bottom: ${SPACING_4};

  ${({ status }) => css`
    padding-top: ${isLiveStatus(status) ? 0 : SPACING_4};
  `}
  @media (min-width: ${GROUP_3}) {
    flex-direction: row;
    ${fontScaleBody}
    ${({ status }) => css`
      padding-top: ${isLiveStatus(status) ? SPACING_2 : SPACING_6};
    `}
  }
`;

const DateWrapper = styled.div`
  display: flex;
  justify-content: flex-end;

  flex-direction: column;
  @media (min-width: ${GROUP_3}) {
    flex-direction: row;
  }
`;

const DateHeader = styled.div`
  display: flex;
  justify-content: center;

  padding-bottom: ${SPACING_1};
  @media (min-width: ${GROUP_3}) {
    padding-bottom: 0;
  }
`;

const Interpunct = styled.div`
  color: ${({ theme }) => theme.colourPalette.secondary};

  display: none;
  @media (min-width: ${GROUP_3}) {
    display: inline;
    padding: 0 ${SPACING_2};
  }
`;

const TournamentHeader = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const Date = styled.time`
  color: ${({ theme }) => theme.colourPalette.secondary};
  flex-shrink: 0;
`;

const CompetitionFormatter = styled.div`
  white-space: pre;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0px;
  flex-shrink: 1;
`;

const formatTournamentDescriptionLabel = tournamentDescriptionLabel => {
  const tournamentGroupsArray = tournamentDescriptionLabel.split(' - ');

  return tournamentGroupsArray.map((element, i) => {
    if (tournamentGroupsArray.length === i + 1) {
      return <CompetitionFormatter key={`tournament_part_${i}`}>{element}</CompetitionFormatter>;
    }
    return <CompetitionFormatter key={`tournament_part_${i}`}>{element} - </CompetitionFormatter>;
  });
};

const HeadToHeadHeader = ({ date, tournamentDescriptionLabel, status }) => (
  <HeaderWrapper status={status}>
    {!isLiveStatus(status) && (
      <DateWrapper status={status}>
        <DateHeader>
          <Date>{date}</Date>
        </DateHeader>
        <Interpunct aria-hidden>‧</Interpunct>
      </DateWrapper>
    )}
    <TournamentHeader>{formatTournamentDescriptionLabel(tournamentDescriptionLabel)}</TournamentHeader>
  </HeaderWrapper>
);

export default HeadToHeadHeader;
