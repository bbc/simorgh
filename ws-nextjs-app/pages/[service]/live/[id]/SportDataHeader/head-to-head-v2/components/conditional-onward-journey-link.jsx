import React from 'react';
import styled from '@bbc/web-styled';
import { Track } from '@bbc/web-click-view-tracker';
import { GridContainer, TeamHome, TeamAway } from './head-to-head-banner.jsx';
import { Name as ParticipantsName } from '../../head-to-head/components/participant.jsx';

const OnwardJourneyLink = styled.a`
  cursor: pointer;

  &:link {
    text-decoration: none;
    color: ${({ theme }) => theme.colourPalette.primary};
  }

  &:visited {
    color: ${({ theme }) => theme.colourPalette.primary};
  }

  &:hover,
  &:focus > ${GridContainer} {
    ${TeamHome}, ${TeamAway}, ${ParticipantsName} {
      color: ${({ theme }) => theme.colourPalette.hyperlink};
      text-decoration-line: underline;
    }
  }
`;

// eslint-disable-next-line import/prefer-default-export
export const ConditionalOnwardJourneyLink = ({
  isConciseView,
  onwardJourneyLink,
  children,
  tipoTopicId,
  trackingEvent,
}) => {
  if (isConciseView && onwardJourneyLink) {
    return trackingEvent ? (
      <Track tracking={trackingEvent}>
        {({ trackRef }) => (
          <div ref={trackRef}>
            <OnwardJourneyLink
              href={onwardJourneyLink}
              data-tipo-id={tipoTopicId}
            >
              {children}
            </OnwardJourneyLink>
          </div>
        )}
      </Track>
    ) : (
      <OnwardJourneyLink href={onwardJourneyLink} data-tipo-id={tipoTopicId}>
        {children}
      </OnwardJourneyLink>
    );
  }

  return children;
};
