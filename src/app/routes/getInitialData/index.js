import 'isomorphic-fetch';

const upstreamStatusCodesToPropagate = [200, 404];

const getInitialData = async ({ match }) => {
  const { id, service, amp } = match.params;
  const isAmp = !!amp;
  const url = `${process.env.SIMORGH_BASE_URL}/${service}/articles/${id}.json`;

  let data;
  let status;

  try {
    const response = await fetch(url);

    status = response.status; // eslint-disable-line prefer-destructuring

    if (status === 200) {
      data = await response.json();
    } else if (!upstreamStatusCodesToPropagate.includes(status)) {
      // eslint-disable-next-line no-console
      console.warn(
        `Unexpected upstream response (HTTP status code ${status}) when requesting ${url}`,
      );
      status = 502;
    }
  } catch (error) {
    console.log(error); // eslint-disable-line no-console
    status = 502;
  }

  return {
    isAmp,
    data,
    service,
    status,
  };
};

export default getInitialData;
