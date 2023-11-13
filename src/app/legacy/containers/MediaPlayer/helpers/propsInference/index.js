import getDefaultProps from './default';
import livePageProps from './livePage';

const getPlayerProps = ({ pageType, ...params }) => {
  const propsHandler = {
    live: livePageProps,
  }[pageType];

  return propsHandler ? propsHandler(params) : getDefaultProps(params);
};

export default getPlayerProps;
