import moment from 'moment-timezone';

// when using this function, we recommend using webpack configuration to only load in the relevant timezone, rather than all of moment-timezone
export const formatUnixTimestamp = (timestamp, momentString, timezone) =>
  moment(timestamp).tz(timezone).format(momentString);
