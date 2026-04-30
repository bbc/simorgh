// import React from 'react';
// import { BREAKPOINT_VIEWPORTS } from '@bbc/web-gel-foundations';
import Heading from '#app/components/Heading';
// import { Stack } from '@bbc/web-gel-layouts';
import { preEventData } from '../static-data/event/transformed/pre-event/index';
import {
  inPens90Data,
  secondHalf90Data,
} from '../static-data/event/transformed/mid-event/index';
// import { rugbyTransformedMidEvent } from '../static-data/event/transformed/rugby/event/transformed/index.js';
import { postEventData } from '../static-data/event/transformed/post-event/index';
import cancelledEventData from '../static-data/event/transformed/cancelled.json';
import postponedEventData from '../static-data/event/transformed/postponed.json';
import abandonedEventData from '../static-data/event/transformed/abandoned.json';
import suspendedEventData from '../static-data/event/transformed/suspended.json';
import { HeadToHeadV2 } from '../head-to-head-v2';
// import mdx from '../head-to-head-v2.mdx';

export default {
  title:
    'Components/Live Page Sport Data Header/Head To Head V2 - Screenshot tests',
  component: HeadToHeadV2,
  parameters: {
    chromatic: { disable: true },
    // docs: {
    //   page: mdx,
    // },
    // chromatic: {
    //   viewports: BREAKPOINT_VIEWPORTS,
    // },
  },
  // globals: {
  //   corePalette: 'lightAlternative',
  //   servicePalette: 'sportLight',
  //   fontPalette: 'sansSimple',
  // },
};

const getFullData = ({ homeScore = '2', awayScore = '2' }) => ({
  ...postEventData,
  home: {
    ...postEventData.home,
    score: homeScore,
  },
  away: {
    ...postEventData.away,
    score: awayScore,
  },
});

const getHiddenBadgesData = data => ({
  ...data,
  tournament: {
    ...data.tournament,
    urn: 'urn:bbc:sportsdata:unknown-sport:tournament:unknown-league',
  },
});

// @ts-expect-error - PS copy and paste
const SingleDigitsScoreFull = () => <HeadToHeadV2 data={getFullData({})} />;

const DoubleScoreFullHome = () => (
  // @ts-expect-error - PS copy and paste
  <HeadToHeadV2 data={getFullData({ homeScore: '22' })} />
);
const DoubleScoreFullAway = () => (
  // @ts-expect-error - PS copy and paste
  <HeadToHeadV2 data={getFullData({ awayScore: '22' })} />
);

const TripleScoreFullHome = () => (
  // @ts-expect-error - PS copy and paste
  <HeadToHeadV2 data={getFullData({ homeScore: '222' })} />
);
const TripleScoreFullAway = () => (
  // @ts-expect-error - PS copy and paste
  <HeadToHeadV2 data={getFullData({ awayScore: '222' })} />
);

const NoScoreFullHome = () => (
  // @ts-expect-error - PS copy and paste
  <HeadToHeadV2 data={getFullData({ homeScore: '', awayScore: '22' })} />
);
const NoScoreFullAway = () => (
  // @ts-expect-error - PS copy and paste
  <HeadToHeadV2 data={getFullData({ homeScore: '22', awayScore: '' })} />
);

const LongScoreFullHome = () => (
  // @ts-expect-error - PS copy and paste
  <HeadToHeadV2 data={getFullData({ homeScore: '2222222' })} />
);
const LongScoreFullAway = () => (
  // @ts-expect-error - PS copy and paste
  <HeadToHeadV2 data={getFullData({ awayScore: '2222222' })} />
);

const SingleDigitsScoreConcise = () => (
  // @ts-expect-error - PS copy and paste
  <HeadToHeadV2 data={getFullData({})} isConciseView />
);

const DoubleScoreConciseHome = () => (
  // @ts-expect-error - PS copy and paste
  <HeadToHeadV2 data={getFullData({ homeScore: '22' })} isConciseView />
);
const DoubleScoreConciseAway = () => (
  // @ts-expect-error - PS copy and paste
  <HeadToHeadV2 data={getFullData({ awayScore: '22' })} isConciseView />
);

const TripleScoreConciseHome = () => (
  // @ts-expect-error - PS copy and paste
  <HeadToHeadV2 data={getFullData({ homeScore: '222' })} isConciseView />
);
const TripleScoreConciseAway = () => (
  // @ts-expect-error - PS copy and paste
  <HeadToHeadV2 data={getFullData({ awayScore: '222' })} isConciseView />
);

const NoScoreConciseHome = () => (
  <HeadToHeadV2
    // @ts-expect-error - PS copy and paste
    data={getFullData({ homeScore: '', awayScore: '22' })}
    isConciseView
  />
);
const NoScoreConciseAway = () => (
  <HeadToHeadV2
    // @ts-expect-error - PS copy and paste
    data={getFullData({ homeScore: '22', awayScore: '' })}
    isConciseView
  />
);

const LongScoreConciseHome = () => (
  // @ts-expect-error - PS copy and paste
  <HeadToHeadV2 data={getFullData({ homeScore: '2222222' })} isConciseView />
);
const LongScoreConciseAway = () => (
  // @ts-expect-error - PS copy and paste
  <HeadToHeadV2 data={getFullData({ awayScore: '2222222' })} isConciseView />
);

const PostEventConciseViewInDoubleDigitScorePage = () => (
  <HeadToHeadV2
    // @ts-expect-error - PS copy and paste
    data={postEventData}
    isConciseView
    // @ts-expect-error - PS copy and paste
    maximumContainerScoreDigits={2}
  />
);

export const ScoreTests = () => (
  <>
    <Heading level={1}>Score Length Tests: Full View</Heading>
    <SingleDigitsScoreFull />
    <DoubleScoreFullHome />
    <DoubleScoreFullAway />
    <TripleScoreFullHome />
    <TripleScoreFullAway />
    <NoScoreFullHome />
    <NoScoreFullAway />
    <LongScoreFullHome />
    <LongScoreFullAway />
    <Heading level={1}>Score Length Tests: Concise View</Heading>
    <SingleDigitsScoreConcise />
    <DoubleScoreConciseHome />
    <DoubleScoreConciseAway />
    <TripleScoreConciseHome />
    <TripleScoreConciseAway />
    <NoScoreConciseHome />
    <NoScoreConciseAway />
    <LongScoreConciseHome />
    <LongScoreConciseAway />
    <Heading level={1}>
      Single Digit Score in a container with other double digit scores
    </Heading>
    <PostEventConciseViewInDoubleDigitScorePage />
  </>
);

const PreEventFullViewWithoutBadges = () => (
  // @ts-expect-error - PS copy and paste
  <HeadToHeadV2
    data={getHiddenBadgesData(preEventData)}
    isConciseView={false}
    shouldHideBadges
  />
);
const MidEventFullViewWithoutBadges = () => (
  // @ts-expect-error - PS copy and paste
  <HeadToHeadV2
    data={getHiddenBadgesData(inPens90Data)}
    isConciseView={false}
    shouldHideBadges
  />
);
const PostEventFullViewWithoutBadges = () => (
  // @ts-expect-error - PS copy and paste
  <HeadToHeadV2
    data={getHiddenBadgesData(postEventData)}
    isConciseView={false}
    shouldHideBadges
  />
);
const CancelledEventFullViewWithoutBadges = () => (
  // @ts-expect-error - PS copy and paste
  <HeadToHeadV2
    data={getHiddenBadgesData(cancelledEventData)}
    isConciseView={false}
    shouldHideBadges
  />
);
const PostponedEventFullViewWithoutBadges = () => (
  // @ts-expect-error - PS copy and paste
  <HeadToHeadV2
    data={getHiddenBadgesData(postponedEventData)}
    isConciseView={false}
    shouldHideBadges
  />
);
const SuspendedEventFullViewWithoutBadges = () => (
  // @ts-expect-error - PS copy and paste
  <HeadToHeadV2
    data={getHiddenBadgesData(suspendedEventData)}
    isConciseView={false}
    shouldHideBadges
  />
);
const AbandonedEventFullViewWithoutBadges = () => (
  // @ts-expect-error - PS copy and paste
  <HeadToHeadV2
    data={getHiddenBadgesData(abandonedEventData)}
    isConciseView={false}
    shouldHideBadges
  />
);

const PreEventConciseViewWithoutBadges = () => (
  // @ts-expect-error - PS copy and paste
  <HeadToHeadV2
    data={getHiddenBadgesData(preEventData)}
    isConciseView
    shouldHideBadges
  />
);
const MidEventConciseViewWithoutBadges = () => (
  // @ts-expect-error - PS copy and paste
  <HeadToHeadV2
    data={getHiddenBadgesData(inPens90Data)}
    isConciseView
    shouldHideBadges
  />
);
const PostEventConciseViewWithoutBadges = () => (
  // @ts-expect-error - PS copy and paste
  <HeadToHeadV2
    data={getHiddenBadgesData(postEventData)}
    isConciseView
    shouldHideBadges
  />
);
const CancelledEventConciseViewWithoutBadges = () => (
  // @ts-expect-error - PS copy and paste
  <HeadToHeadV2
    data={getHiddenBadgesData(cancelledEventData)}
    isConciseView
    shouldHideBadges
  />
);
const PostponedEventConciseViewWithoutBadges = () => (
  // @ts-expect-error - PS copy and paste
  <HeadToHeadV2
    data={getHiddenBadgesData(postponedEventData)}
    isConciseView
    shouldHideBadges
  />
);
const SuspendedEventConciseViewWithoutBadges = () => (
  // @ts-expect-error - PS copy and paste
  <HeadToHeadV2
    data={getHiddenBadgesData(suspendedEventData)}
    isConciseView
    shouldHideBadges
  />
);
const AbandonedEventConciseViewWithoutBadges = () => (
  // @ts-expect-error - PS copy and paste
  <HeadToHeadV2
    data={getHiddenBadgesData(abandonedEventData)}
    isConciseView
    shouldHideBadges
  />
);

export const HiddenBadgesTests = () => (
  <>
    <Heading level={1}>No Badge Tests: Full View</Heading>
    <PreEventFullViewWithoutBadges />
    <MidEventFullViewWithoutBadges />
    <PostEventFullViewWithoutBadges />
    <CancelledEventFullViewWithoutBadges />
    <PostponedEventFullViewWithoutBadges />
    <SuspendedEventFullViewWithoutBadges />
    <AbandonedEventFullViewWithoutBadges />
    <Heading level={1}>No Badge Tests: Concise View</Heading>
    <PreEventConciseViewWithoutBadges />
    <MidEventConciseViewWithoutBadges />
    <PostEventConciseViewWithoutBadges />
    <CancelledEventConciseViewWithoutBadges />
    <PostponedEventConciseViewWithoutBadges />
    <SuspendedEventConciseViewWithoutBadges />
    <AbandonedEventConciseViewWithoutBadges />
  </>
);

const getNoPeriodLabelData = data => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { periodLabel, ...rest } = data;
  return rest;
};

// const MidEventFullViewWithPeriodLabel = () => (
//   <HeadToHeadV2 data={rugbyTransformedMidEvent} isConciseView={false} />
// );

const MidEventFullViewWithoutPeriodLabel = () => (
  // @ts-expect-error - PS copy and paste
  <HeadToHeadV2
    data={getNoPeriodLabelData(secondHalf90Data)}
    isConciseView={false}
  />
);
const PostEventFullViewWithoutPeriodLabel = () => (
  // @ts-expect-error - PS copy and paste
  <HeadToHeadV2
    data={getNoPeriodLabelData(postEventData)}
    isConciseView={false}
  />
);

// const MidEventConciseViewWithPeriodLabel = () => (
//   <HeadToHeadV2 data={rugbyTransformedMidEvent} isConciseView />
// );
const MidEventConciseViewWithoutPeriodLabel = () => (
  // @ts-expect-error - PS copy and paste
  <HeadToHeadV2 data={getNoPeriodLabelData(secondHalf90Data)} isConciseView />
);
const PostEventConciseViewWithoutPeriodLabel = () => (
  // @ts-expect-error - PS copy and paste
  <HeadToHeadV2 data={getNoPeriodLabelData(postEventData)} isConciseView />
);

export const Tests = () => (
  <>
    <Heading level={1}>No Period Label Tests: Full View</Heading>
    <MidEventFullViewWithoutPeriodLabel />
    <PostEventFullViewWithoutPeriodLabel />
    <Heading level={1}>MidEvent Period Label Tests: Full View</Heading>
    {/* <MidEventFullViewWithPeriodLabel /> */}
    <Heading level={1}>No Period Label Tests: Concise View</Heading>
    <MidEventConciseViewWithoutPeriodLabel />
    <PostEventConciseViewWithoutPeriodLabel />
    <Heading level={1}>MidEvent Period Label Tests: Concise View</Heading>
    {/* <MidEventConciseViewWithPeriodLabel /> */}
  </>
);
