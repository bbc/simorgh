export const getRadioScheduleEndpoint = ({
  service,
  radioService = service,
  env,
  queryString,
}) => {
  if (env !== 'live' && queryString) {
    return `/${service}/bbc_${radioService}_radio/schedule.json?${queryString}`;
  }
  return `/${service}/bbc_${radioService}_radio/schedule.json`;
};

export const getLocalRadioScheduleEndpoint = ({
  service,
  radioService = service,
}) => `./data/${service}/bbc_${radioService}_radio/schedule.json`;

export const getLink = ({
  service,
  currentState,
  programServiceId,
  broadcastPid,
}) => {
  const path = `/${service}/${programServiceId}`;
  return currentState === 'live'
    ? `${path}/liveradio`
    : `${path}/${broadcastPid}`;
};
