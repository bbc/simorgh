import 'isomorphic-fetch';
import isServer from '../../helpers/isServer';

const getInitialData = async ({ match }) => {
  try {
    const { id, service, amp } = match.params;

    let url = `/data/${service}/${id}.json`;

    if (isServer()) {
      url = `${process.env.RAZZLE_BASE_PATH}${url}`;
    }

    const response = await fetch(url);
    const data = await response.json();
    const isAmp = amp === '.amp';

    return {
      amp: isAmp,
      data,
      service,
    };
  } catch (error) {
    console.log(error); // eslint-disable-line no-console
    return {};
  }
};

export default getInitialData;
