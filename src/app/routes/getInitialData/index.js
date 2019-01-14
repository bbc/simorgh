import 'isomorphic-fetch';

const getInitialData = async ({ match }) => {
  try {
    const { id, service, amp } = match.params;

    console.log(process.env.SIMORGH_BASE_URL);

    const url = `${
      process.env.SIMORGH_BASE_URL
    }/${service}/articles/${id}.json`;

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
