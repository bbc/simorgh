// import React from 'react';
// import styled, { css } from '@bbc/web-styled';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
// import {
//   GROUP_3,
//   SPACING_6,
//   SPACING_4,
//   SPACING_2,
//   SPACING_1,
//   fontScaleBody,
//   fontScaleDescription
// } from '@bbc/web-gel-foundations';
import { isLiveStatus } from '../helpers/event-status-groups';
// eslint-disable-next-line import/no-relative-packages
import pixelsToRem from '../../../../utilities/pixelsToRem';

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  font-size: 14px;
  line-height: 1.2857142857142858;
  padding-bottom: 16px;

  ${({ status }) => css`
    padding-top: ${isLiveStatus(status) ? 0 : '16px'};
  `}
  @media (min-width: ${pixelsToRem(600)}rem) {
    flex-direction: row;
    font-size: 1rem;
    line-height: 1.375;
    ${({ status }) => css`
      padding-top: ${isLiveStatus(status) ? '8px' : '24px'};
    `}
  }
`;

const DateWrapper = styled.div`
  display: flex;
  justify-content: flex-end;

  flex-direction: column;
  @media (min-width: ${pixelsToRem(600)}rem) {
    flex-direction: row;
  }
`;

const DateHeader = styled.div`
  display: flex;
  justify-content: center;

  padding-bottom: 4px;
  @media (min-width: ${pixelsToRem(600)}rem) {
    padding-bottom: 0;
  }
`;

const Interpunct = styled.div`
  color: #a8a8a8;

  display: none;
  @media (min-width: ${pixelsToRem(600)}rem) {
    display: inline;
    padding: 0 8px;
  }
`;

const TournamentHeader = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const Date = styled.time`
  color: #a8a8a8;
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
      return (
        // eslint-disable-next-line react/no-array-index-key
        <CompetitionFormatter key={`tournament_part_${i}`}>
          {element}
        </CompetitionFormatter>
      );
    }
    return (
      // eslint-disable-next-line react/no-array-index-key
      <CompetitionFormatter key={`tournament_part_${i}`}>
        {element} -{' '}
      </CompetitionFormatter>
    );
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
    <TournamentHeader>
      {formatTournamentDescriptionLabel(tournamentDescriptionLabel)}
    </TournamentHeader>
  </HeaderWrapper>
);

export default HeadToHeadHeader;
