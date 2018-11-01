import 'isomorphic-fetch';
import axios from 'axios';

const getInitialData = async ({ match }) => {
  try {
    const { id, service, amp } = match.params;

    const url = `${
      process.env.RAZZLE_BASE_PATH
    }/${service}/articles/${id}.json`;

    const articleJsonResponse = await axios.get(url);

    const { data } = articleJsonResponse;

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
