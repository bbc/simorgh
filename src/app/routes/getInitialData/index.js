import 'isomorphic-fetch';

const getInitialData = async ({ match }) => {
  try {
    const { id, service, amp } = match.params;

    let url = `/data/${service}/articles/${id}.json`;

    // URL on server
    if (process.env.NODE) {
      url = `${process.env.RAZZLE_BASE_PATH}${url}`;
    }

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
