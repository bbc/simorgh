export const getRadioScheduleEndpoint = ({ service, env, queryString }) => {
  if (env !== 'live' && queryString) {
    return `/${service}/bbc_${service}_radio/schedule.json${queryString}`;
  }
  return `/${service}/bbc_${service}_radio/schedule.json`;
};

export const getLocalRadioScheduleEndpoint = ({ service }) =>
  `./data/${service}/bbc_${service}_radio/schedule.json`;
