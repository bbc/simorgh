import type { JSX } from 'react';

export enum EventStatus {
  PreEvent = 'PreEvent',
  MidEvent = 'MidEvent',
  PostEvent = 'PostEvent',
  Abandoned = 'Abandoned',
  Cancelled = 'Cancelled',
  Suspended = 'Suspended',
  Postponed = 'Postponed',
  Delayed = 'Delayed',
  Intermission = 'Intermission',
}

export type Action = {
  type: string;
  typeLabel: {
    value: string;
    accessible: string;
  };
  timeLabel: {
    value: string;
    accessible: string;
  };
};

export type Actions = {
  playerId: string;
  playerName: string;
  actionType: string;
  actions: Action[];
};

export type GroupedActions = {
  /**
   * The name of the grouped action e.g. Penalties, Tries.
   */
  groupName: { fullName: string; shortName: string };
  /**
   * The home team action details.
   */
  homeTeamActions: string[];
  /**
   * The home team accessible action details.
   */
  homeTeamAccessibleActions?: string[];
  /**
   * The away team action details.
   */
  awayTeamActions: string[];
  /**
   * The away team accessible action details.
   */
  awayTeamAccessibleActions?: string[];
};

export type RunningScores = {
  halftime?: string;
  fulltime?: string;
  extratime?: string;
  aggregate?: string;
  penaltyShootout?: string;
};

export type Team = {
  /**
   * The Team's unique id.
   */
  id: string;
  /**
   * Full name of the team.
   */
  fullName: string;
  /**
   * Abbreviated name of the team.
   */
  shortName: string;
  /**
   * The urn for the team. This is used to lookup the team badge.
   * If no urn is provided or a badge does not exist, a placeholder badge is used.
   */
  urn?: string;
  /**
   * The fulltime and halftime running scores for the team.
   */
  runningScores?: RunningScores;
  /**
   * The current team score.
   */
  score?: string;
  /**
   * This attribute is an early indication of a goal. It collects a goal event, significantly shortening the time you receive score updates.
   * Fallback to score total value (when there are no unconfirmed goals)
   */
  scoreUnconfirmed?: string;
  /**
   * The team actions displayed as a summary. Any actions that are available will be rendered.
   * Actions are not rendered in concise view.
   */
  actions?: Actions[];
};

export type HeadToHeadV2Data = {
  /**
   * The event id.
   */
  id?: string;
  /**
   * The status of the event.
   */
  status: EventStatus;
  /**
   * The date of the event in 'EEE d MMM yyyy' format. E.g. 'Sat 28 Oct 2023'.
   */
  date: string;
  /**
   * The tournament details.
   */
  tournament: {
    id: string;
    name: string;
    urn: string;
  };
  /**
   * The name/description of the tournament.
   */
  tournamentDescriptionLabel: string;
  /**
   * The current period of the event e.g FT, HT.
   */
  periodLabel?: { value: string; accessible: string };
  /**
   * Actions for the home and away teams grouped by group name.
   * Any grouped actions that are available will be rendered.
   * Actions are not rendered in concise view.
   */
  groupedActions?: GroupedActions[];
  /**
   * Details and scores for home team.
   */
  home: Team;
  /**
   * Details and scores for home team.
   */
  away: Team;
  /**
   * Time of the event in 'HH:mm' format.
   */
  time: { displayTimeUK: string; accessibleTime: string };
  /**
   * Name of the venue.
   * Venue is not rendered in concise view.
   * @default 'To be confirmed'
   */
  venue?: { name: string };
  /**
   * Summary of event to be used with assistive technology.
   */
  accessibleEventSummary: string;
  /**
   * Link to the event page for onward navigation.
   */
  onwardJourneyLink?: string;
  /**
   * The TIPO topic ID for the event.
   */
  tipoTopicId?: string;
  /**
   * The current period/phase of the event.
   */
  period?: string;
  /**
   * Attendance information for the event.
   */
  attendance?: {
    value?: string;
    additionalInfo?: string;
  };
  /**
   * The winner alignment ('home' or 'away').
   */
  winner?: string;
  /**
   * The series winner alignment for multi-leg matches.
   */
  seriesWinner?: string;
  /**
   * Multi-leg match information.
   */
  multiLeg?: {
    leg: number;
    relatedMatchId?: string;
    aggregateWinnerId?: string;
  };
};

export declare const HeadToHeadV2: (props: {
  data: HeadToHeadV2Data;
  isConciseView: boolean;
  shouldHideBadges: boolean;
  shouldShowActions: boolean;
  /**
   * The maximum number of digits (i.e. characters) in any score in a stack of H2Hv2 components. This ensures that
   * the badges/teams line up horizontally the whole way down the stack, without adding extra padding when not required.
   *
   * By default, the central section of H2Hv2 will expand as little as possible to fit the given score.
   */
  maximumContainerScoreDigits?: string;
  /**
   * Optional setting for the sport badge's placeholder fallback type when a mapping doesn't exist for a team.
   *
   * Used to e.g. fall back to a grey rectangle instead of a badge icon when the page predominantly shows flags.
   *
   * @default 'badge'
   */
  teamBadgePlaceholderFallbackType?: 'badge' | 'flag';
}) => JSX.Element;

export default HeadToHeadV2;
