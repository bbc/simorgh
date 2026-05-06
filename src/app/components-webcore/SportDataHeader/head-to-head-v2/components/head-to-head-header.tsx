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
import styles from './index.styles';
import type { EventStatus } from '../types';

const formatTournamentDescriptionLabel = (tournamentDescriptionLabel: string) => {
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

interface HeadToHeadHeaderProps {
  date: string;
  tournamentDescriptionLabel: string;
  status: EventStatus;
  tournament?: string;
  period?: string;
}

const HeadToHeadHeader = ({ date, tournamentDescriptionLabel, status }: HeadToHeadHeaderProps) => (
  <div css={styles.headerWrapper(isLiveStatus(status))}>
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
