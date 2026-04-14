import { SPORT_EVENT_STATUS } from './enums/sport-event-status.js';

const FIXTURE_STATUSES = [SPORT_EVENT_STATUS.PreEvent, SPORT_EVENT_STATUS.Postponed, SPORT_EVENT_STATUS.Delayed];
const LIVE_STATUSES = [SPORT_EVENT_STATUS.MidEvent, SPORT_EVENT_STATUS.Intermission];
const IN_PROGRESS_STATUSES = [...LIVE_STATUSES, SPORT_EVENT_STATUS.Suspended];
const RESULT_STATUSES = [SPORT_EVENT_STATUS.PostEvent];
const CALLED_OFF_STATUSES = [SPORT_EVENT_STATUS.Cancelled, SPORT_EVENT_STATUS.Abandoned];

export const isFixtureStatus = status => FIXTURE_STATUSES.includes(status);

export const isInProgressStatus = status => IN_PROGRESS_STATUSES.includes(status);

export const isLiveStatus = status => LIVE_STATUSES.includes(status);

export const isResultStatus = status => RESULT_STATUSES.includes(status);

export const isCalledOffStatus = status => CALLED_OFF_STATUSES.includes(status);
