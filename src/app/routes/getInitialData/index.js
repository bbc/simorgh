import 'isomorphic-fetch';

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
    }
  } catch (error) {
    console.log(error); // eslint-disable-line no-console
    status = 502;
  }

  return {
    articleData: {
      isAmp,
      data,
      service,
    },
    status,
  };
};

export default getInitialData;
