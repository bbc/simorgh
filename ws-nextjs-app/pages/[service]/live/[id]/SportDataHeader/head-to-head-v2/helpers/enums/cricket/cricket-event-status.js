export const CRICKET_EVENT_STATUS = {
  PreEvent: 'PreEvent',
  PostEvent: 'PostEvent',
  InPlay: 'InPlay',
  Lunch: 'Lunch',
  Tea: 'Tea',
  Dinner: 'Dinner',
  ScheduledBreak: 'ScheduledBreak',
  Suspended: 'Suspended',
  Postponed: 'Postponed',
  Cancelled: 'Cancelled',
  Abandoned: 'Abandoned',
  StrategicTimeout: 'StrategicTimeout'
};

export const CRICKET_LIVE_STATUSES = [
  CRICKET_EVENT_STATUS.InPlay,
  CRICKET_EVENT_STATUS.Lunch,
  CRICKET_EVENT_STATUS.Tea,
  CRICKET_EVENT_STATUS.Dinner,
  CRICKET_EVENT_STATUS.StrategicTimeout
];
