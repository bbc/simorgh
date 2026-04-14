import React from 'react';
import { BREAKPOINT_VIEWPORTS } from '@bbc/web-gel-foundations';
import Heading from '@bbc/web-components/heading/index.js';
import { Stack } from '@bbc/web-gel-layouts';
import { preEventData } from '@bbc/web-sport-utils/tests/static-data/football/event/transformed/pre-event/index.js';
import {
  inPens90Data,
  secondHalf90Data
} from '@bbc/web-sport-utils/tests/static-data/football/event/transformed/mid-event/index.js';
import { rugbyTransformedMidEvent } from '@bbc/web-sport-utils/tests/static-data/rugby/event/transformed/index.js';
import { postEventData } from '@bbc/web-sport-utils/tests/static-data/football/event/transformed/post-event/index.js';
import cancelledEventData from '@bbc/web-sport-utils/tests/static-data/football/event/transformed/cancelled.json';
import postponedEventData from '@bbc/web-sport-utils/tests/static-data/football/event/transformed/postponed.json';
import abandonedEventData from '@bbc/web-sport-utils/tests/static-data/football/event/transformed/abandoned.json';
import suspendedEventData from '@bbc/web-sport-utils/tests/static-data/football/event/transformed/suspended.json';
import { produce } from 'immer';
import { HeadToHeadV2 } from '../head-to-head-v2.jsx';
import mdx from '../head-to-head-v2.mdx';

export default {
  title: 'Components/Presentation/Head To Head V2/Tests',
  component: HeadToHeadV2,
  parameters: {
    docs: {
      page: mdx
    },
    chromatic: {
      viewports: BREAKPOINT_VIEWPORTS
    }
  },
  globals: {
    corePalette: 'lightAlternative',
    servicePalette: 'sportLight',
    fontPalette: 'sansSimple'
  }
};

const getFullData = ({ homeScore = '2', awayScore = '2' }) =>
  produce(postEventData, draft => {
    draft.home.score = homeScore;
    draft.away.score = awayScore;
  });

const getHiddenBadgesData = data =>
  produce(data, draft => {
    draft.tournament.urn = 'urn:bbc:sportsdata:unknown-sport:tournament:unknown-league';
  });

const SingleDigitsScoreFull = () => <HeadToHeadV2 data={getFullData({})} />;

const DoubleScoreFullHome = () => <HeadToHeadV2 data={getFullData({ homeScore: '22' })} />;
const DoubleScoreFullAway = () => <HeadToHeadV2 data={getFullData({ awayScore: '22' })} />;

const TripleScoreFullHome = () => <HeadToHeadV2 data={getFullData({ homeScore: '222' })} />;
const TripleScoreFullAway = () => <HeadToHeadV2 data={getFullData({ awayScore: '222' })} />;

const NoScoreFullHome = () => <HeadToHeadV2 data={getFullData({ homeScore: '', awayScore: '22' })} />;
const NoScoreFullAway = () => <HeadToHeadV2 data={getFullData({ homeScore: '22', awayScore: '' })} />;

const LongScoreFullHome = () => <HeadToHeadV2 data={getFullData({ homeScore: '2222222' })} />;
const LongScoreFullAway = () => <HeadToHeadV2 data={getFullData({ awayScore: '2222222' })} />;

const SingleDigitsScoreConcise = () => <HeadToHeadV2 data={getFullData({})} isConciseView />;

const DoubleScoreConciseHome = () => <HeadToHeadV2 data={getFullData({ homeScore: '22' })} isConciseView />;
const DoubleScoreConciseAway = () => <HeadToHeadV2 data={getFullData({ awayScore: '22' })} isConciseView />;

const TripleScoreConciseHome = () => <HeadToHeadV2 data={getFullData({ homeScore: '222' })} isConciseView />;
const TripleScoreConciseAway = () => <HeadToHeadV2 data={getFullData({ awayScore: '222' })} isConciseView />;

const NoScoreConciseHome = () => <HeadToHeadV2 data={getFullData({ homeScore: '', awayScore: '22' })} isConciseView />;
const NoScoreConciseAway = () => <HeadToHeadV2 data={getFullData({ homeScore: '22', awayScore: '' })} isConciseView />;

const LongScoreConciseHome = () => <HeadToHeadV2 data={getFullData({ homeScore: '2222222' })} isConciseView />;
const LongScoreConciseAway = () => <HeadToHeadV2 data={getFullData({ awayScore: '2222222' })} isConciseView />;

const PostEventConciseViewInDoubleDigitScorePage = () => (
  <HeadToHeadV2 data={postEventData} isConciseView maximumContainerScoreDigits={2} />
);

export const ScoreTests = () => (
  <Stack spacing={4}>
    <Heading level="1" fontScale="indexHeadlineLarge">
      Score Length Tests: Full View
    </Heading>
    <SingleDigitsScoreFull />
    <DoubleScoreFullHome />
    <DoubleScoreFullAway />
    <TripleScoreFullHome />
    <TripleScoreFullAway />
    <NoScoreFullHome />
    <NoScoreFullAway />
    <LongScoreFullHome />
    <LongScoreFullAway />
    <Heading level="1" fontScale="indexHeadlineLarge">
      Score Length Tests: Concise View
    </Heading>
    <SingleDigitsScoreConcise />
    <DoubleScoreConciseHome />
    <DoubleScoreConciseAway />
    <TripleScoreConciseHome />
    <TripleScoreConciseAway />
    <NoScoreConciseHome />
    <NoScoreConciseAway />
    <LongScoreConciseHome />
    <LongScoreConciseAway />
    <Heading level="1" fontScale="indexHeadlineLarge">
      Single Digit Score in a container with other double digit scores
    </Heading>
    <PostEventConciseViewInDoubleDigitScorePage />
  </Stack>
);

const PreEventFullViewWithoutBadges = () => (
  <HeadToHeadV2 data={getHiddenBadgesData(preEventData)} isConciseView={false} shouldHideBadges />
);
const MidEventFullViewWithoutBadges = () => (
  <HeadToHeadV2 data={getHiddenBadgesData(inPens90Data)} isConciseView={false} shouldHideBadges />
);
const PostEventFullViewWithoutBadges = () => (
  <HeadToHeadV2 data={getHiddenBadgesData(postEventData)} isConciseView={false} shouldHideBadges />
);
const CancelledEventFullViewWithoutBadges = () => (
  <HeadToHeadV2 data={getHiddenBadgesData(cancelledEventData)} isConciseView={false} shouldHideBadges />
);
const PostponedEventFullViewWithoutBadges = () => (
  <HeadToHeadV2 data={getHiddenBadgesData(postponedEventData)} isConciseView={false} shouldHideBadges />
);
const SuspendedEventFullViewWithoutBadges = () => (
  <HeadToHeadV2 data={getHiddenBadgesData(suspendedEventData)} isConciseView={false} shouldHideBadges />
);
const AbandonedEventFullViewWithoutBadges = () => (
  <HeadToHeadV2 data={getHiddenBadgesData(abandonedEventData)} isConciseView={false} shouldHideBadges />
);

const PreEventConciseViewWithoutBadges = () => (
  <HeadToHeadV2 data={getHiddenBadgesData(preEventData)} isConciseView shouldHideBadges />
);
const MidEventConciseViewWithoutBadges = () => (
  <HeadToHeadV2 data={getHiddenBadgesData(inPens90Data)} isConciseView shouldHideBadges />
);
const PostEventConciseViewWithoutBadges = () => (
  <HeadToHeadV2 data={getHiddenBadgesData(postEventData)} isConciseView shouldHideBadges />
);
const CancelledEventConciseViewWithoutBadges = () => (
  <HeadToHeadV2 data={getHiddenBadgesData(cancelledEventData)} isConciseView shouldHideBadges />
);
const PostponedEventConciseViewWithoutBadges = () => (
  <HeadToHeadV2 data={getHiddenBadgesData(postponedEventData)} isConciseView shouldHideBadges />
);
const SuspendedEventConciseViewWithoutBadges = () => (
  <HeadToHeadV2 data={getHiddenBadgesData(suspendedEventData)} isConciseView shouldHideBadges />
);
const AbandonedEventConciseViewWithoutBadges = () => (
  <HeadToHeadV2 data={getHiddenBadgesData(abandonedEventData)} isConciseView shouldHideBadges />
);

export const HiddenBadgesTests = () => (
  <Stack spacing={4}>
    <Heading level="1" fontScale="indexHeadlineLarge">
      No Badge Tests: Full View
    </Heading>
    <PreEventFullViewWithoutBadges />
    <MidEventFullViewWithoutBadges />
    <PostEventFullViewWithoutBadges />
    <CancelledEventFullViewWithoutBadges />
    <PostponedEventFullViewWithoutBadges />
    <SuspendedEventFullViewWithoutBadges />
    <AbandonedEventFullViewWithoutBadges />
    <Heading level="1" fontScale="indexHeadlineLarge">
      No Badge Tests: Concise View
    </Heading>
    <PreEventConciseViewWithoutBadges />
    <MidEventConciseViewWithoutBadges />
    <PostEventConciseViewWithoutBadges />
    <CancelledEventConciseViewWithoutBadges />
    <PostponedEventConciseViewWithoutBadges />
    <SuspendedEventConciseViewWithoutBadges />
    <AbandonedEventConciseViewWithoutBadges />
  </Stack>
);

const getNoPeriodLabelData = data =>
  produce(data, draft => {
    delete draft.periodLabel;
  });

const MidEventFullViewWithPeriodLabel = () => <HeadToHeadV2 data={rugbyTransformedMidEvent} isConciseView={false} />;

const MidEventFullViewWithoutPeriodLabel = () => (
  <HeadToHeadV2 data={getNoPeriodLabelData(secondHalf90Data)} isConciseView={false} />
);
const PostEventFullViewWithoutPeriodLabel = () => (
  <HeadToHeadV2 data={getNoPeriodLabelData(postEventData)} isConciseView={false} />
);

const MidEventConciseViewWithPeriodLabel = () => <HeadToHeadV2 data={rugbyTransformedMidEvent} isConciseView />;
const MidEventConciseViewWithoutPeriodLabel = () => (
  <HeadToHeadV2 data={getNoPeriodLabelData(secondHalf90Data)} isConciseView />
);
const PostEventConciseViewWithoutPeriodLabel = () => (
  <HeadToHeadV2 data={getNoPeriodLabelData(postEventData)} isConciseView />
);

export const Tests = () => (
  <Stack spacing={4}>
    <Heading level="1" fontScale="indexHeadlineLarge">
      No Period Label Tests: Full View
    </Heading>
    <MidEventFullViewWithoutPeriodLabel />
    <PostEventFullViewWithoutPeriodLabel />
    <Heading level="1" fontScale="indexHeadlineLarge">
      MidEvent Period Label Tests: Full View
    </Heading>
    <MidEventFullViewWithPeriodLabel />
    <Heading level="1" fontScale="indexHeadlineLarge">
      No Period Label Tests: Concise View
    </Heading>
    <MidEventConciseViewWithoutPeriodLabel />
    <PostEventConciseViewWithoutPeriodLabel />
    <Heading level="1" fontScale="indexHeadlineLarge">
      MidEvent Period Label Tests: Concise View
    </Heading>
    <MidEventConciseViewWithPeriodLabel />
  </Stack>
);
