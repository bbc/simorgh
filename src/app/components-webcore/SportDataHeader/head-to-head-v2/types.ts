import type { JSX } from 'react';

export type EventStatus =
  | 'PreEvent'
  | 'MidEvent'
  | 'PostEvent'
  | 'Abandoned'
  | 'Cancelled'
  | 'Suspended'
  | 'Postponed'
  | 'Delayed'
  | 'Intermission'
  | string;

type Action = {
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

type Actions = {
  playerId: string;
  playerName: string;
  actionType: string;
  actions: Action[];
};

type GroupedActions = {
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
};

type Team = {
  /**
   * The Team's unique id.
   */
  id?: string;
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
  runningScores?: {
    halftime?: string;
    fulltime?: string;
    extratime?: string;
    penaltyShootout?: string;
    aggregate?: string;
  };
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
