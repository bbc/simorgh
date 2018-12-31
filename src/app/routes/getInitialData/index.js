import 'isomorphic-fetch';

const getBaseUrl = () => {
  if (typeof window === 'undefined') {
    // we are on the server
    return process.env.BASE_URL;
  }
  // we are on the client
  const { protocol, hostname, port } = window.location;
  return `${protocol}//${hostname}:${port}`;
};

const getInitialData = async ({ match }) => {
  try {
    const { id, service, amp } = match.params;

    const url = `${getBaseUrl()}/${service}/articles/${id}.json`;

    const response = await fetch(url);

    const data = await response.json();
    const isAmp = !!amp;

    return {
      isAmp,
      data,
      service,
    };
  } catch (error) {
    console.log(error); // eslint-disable-line no-console
    return {};
  }
};

export default getInitialData;
