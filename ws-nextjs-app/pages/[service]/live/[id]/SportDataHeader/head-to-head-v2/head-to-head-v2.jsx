// import React from 'react';
// import styled from '@bbc/web-styled';
import styled from '@emotion/styled';
// import { fontStandard, GROUP_3, SPACING_2 } from '@bbc/web-gel-foundations';
// import { shouldShowTeamBadges } from '@bbc/web-sport-utils';
import shouldShowTeamBadges from './helpers/badges/should-show-team-badges';

import Footer from './components/footer';
import HeadToHeadHeader from './components/head-to-head-header';
// import { getStatusBorderStyles } from './helpers/colour-styles.js';
import { HeadToHeadBanner } from './components/head-to-head-banner';
import { ConditionalOnwardJourneyLink } from './components/conditional-onward-journey-link';
import { Actions } from './components/actions';

// eslint-disable-next-line import/no-relative-packages
import pixelsToRem from '../../../../../../../src/app/utilities/pixelsToRem';

const StyledHeadToHeadWrapper = styled.div`
  background: ${({ isConciseView }) =>
    isConciseView ? '#202020' : '#181818'}; // GREY_15 : GREY_16
  ${
    '' /* border-left: ${({ status, isConciseView }) =>
    getStatusBorderStyles({ status, isConciseView })}; */
  }
  border-left: medium none #009E9E;
`;

const StyledHeadToHead = styled.div`
  font-family: ReithSans, Helvetica, Arial, freesans, sans-serif;
  font-weight: 400;
  font-feature-settings: 'ss01' off;
  color: #f8f8f8;
  padding: ${({ isConciseView }) => (isConciseView ? `8px` : `0`)};
  padding-bottom: ${({ isConciseView }) =>
    !isConciseView &&
    `${pixelsToRem(24)}rem`}; // TODO - decide if we want to move these styles to live page layout

  @media (max-width: ${pixelsToRem(600)}rem) {
    padding-top: ${({ isConciseView }) => (isConciseView ? `8px` : `0`)};
    padding-bottom: ${({ isConciseView }) =>
      !isConciseView &&
      `${pixelsToRem(8)}rem`}; // TODO - decide if we want to move these styles to live page layout
  }
`;

/**
 * @type {typeof import('./head-to-head-v2.d.ts').HeadToHeadV2}
 */
export const HeadToHeadV2 = ({
  data,
  isConciseView,
  shouldShowActions,
  maximumContainerScoreDigits,
  teamBadgePlaceholderFallbackType = 'badge',
}) => {
  const hasActions =
    data?.home?.actions?.length > 0 || data?.away?.actions?.length > 0;
  const shouldHideBadges = !shouldShowTeamBadges(data.tournament?.urn);

  return (
    <StyledHeadToHeadWrapper status={data.status} isConciseView={isConciseView}>
      <ConditionalOnwardJourneyLink
        isConciseView={isConciseView}
        onwardJourneyLink={data.onwardJourneyLink}
        tipoTopicId={data.tipoTopicId}
      >
        <StyledHeadToHead isConciseView={isConciseView}>
          {!isConciseView && (
            <HeadToHeadHeader
              date={data.date}
              tournament={data.tournament.name}
              status={data.status}
              period={data.period}
              tournamentDescriptionLabel={data.tournamentDescriptionLabel}
            />
          )}
          <HeadToHeadBanner
            data={data}
            isConciseView={isConciseView}
            eventSummary={data.accessibleEventSummary}
            shouldHideBadges={shouldHideBadges}
            maxScoreLength={maximumContainerScoreDigits}
            teamBadgePlaceholderFallbackType={teamBadgePlaceholderFallbackType}
          />
          {hasActions && shouldShowActions && <Actions data={data} />}
          {!isConciseView && <Actions data={data} />}
          {!isConciseView && (
            <Footer
              venue={data.venue?.name || 'To be confirmed'}
              status={data.status}
              attendanceValue={data.attendance?.value}
              attendanceInfo={data.attendance?.additionalInfo}
            />
          )}
        </StyledHeadToHead>
      </ConditionalOnwardJourneyLink>
    </StyledHeadToHeadWrapper>
  );
};

export default HeadToHeadV2;
