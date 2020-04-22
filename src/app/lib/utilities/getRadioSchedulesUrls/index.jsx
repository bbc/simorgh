export const getRadioScheduleEndpoint = ({
  service,
  radioService = service,
  env,
  queryString,
  baseUrl = '',
}) => {
  const query = env !== 'live' && queryString ? queryString : '';

  return `${baseUrl}/${service}/bbc_${radioService}_radio/schedule.json${query}`;
};

export const getLocalRadioScheduleEndpoint = ({
  service,
  radioService = service,
}) => `./data/${service}/bbc_${radioService}_radio/schedule.json`;
