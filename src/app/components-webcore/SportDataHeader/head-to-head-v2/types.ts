import type { JSX } from 'react';

export type EventStatusType =
  | 'PreEvent'
  | 'MidEvent'
  | 'PostEvent'
  | 'Abandoned'
  | 'Cancelled'
  | 'Suspended'
  | 'Postponed'
  | 'Delayed'
  | 'Intermission';

export declare enum EventStatus {
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

export type PlayerActions = {
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
   * The away team action details.
   */
  awayTeamActions: string[];
  /**
   * Accessible home team actions.
   */
  homeTeamAccessibleActions?: string[];
  /**
   * Accessible away team actions.
   */
  awayTeamAccessibleActions?: string[];
};

export type RunningScores = {
  halftime?: string;
  fulltime?: string;
  aggregate?: string;
  penaltyShootout?: string;
  extratime?: string;
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
  runningScore: RunningScores;
  /**
   * Running scores with additional fields.
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
  actions?: PlayerActions[];
};

export type HeadToHeadV2Data = {
  /**
   * The event's unique id.
   */
  id?: string;
  /**
   * The status of the event.
   */
  status: EventStatusType;
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
   * Period string.
   */
  period?: string;
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
   * Details and scores for away team.
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

  attendance?: {
    value?: number;
    additionalInfo?: string;
  };
  /**
   * The winner of the event.
   */
  winner?: 'home' | 'away' | 'draw';
  /**
   * The series winner (e.g. in multi-leg competitions).
   */
  seriesWinner?: 'home' | 'away';
  /**
   * Multi-leg competition details.
   */
  multiLeg?: {
    leg: number;
  };
};

export type BadgePlaceholderFallbackType = 'badge' | 'flag';

export type Alignment = 'home' | 'away';

export type BadgeSize =
  | number
  | { small?: number; medium?: number; large?: number };

export interface HeadToHeadV2Props {
  data: HeadToHeadV2Data;
  isConciseView: boolean;
  shouldShowActions?: boolean;
  /**
   * The maximum number of digits (i.e. characters) in any score in a stack of H2Hv2 components.
   * This ensures that the badges/teams line up horizontally the whole way down the stack.
   */
  maximumContainerScoreDigits?: number;
  /**
   * Optional setting for the sport badge's placeholder fallback type.
   * @default 'badge'
   */
  teamBadgePlaceholderFallbackType?: BadgePlaceholderFallbackType;
}

export declare const HeadToHeadV2: (props: HeadToHeadV2Props) => JSX.Element;

export default HeadToHeadV2;
