import getDefaultProps from './default';
import getLivePageProps from './livePage';

const getPlayerProps = ({ pageType, ...params }) => {
  const propsHandler = {
    live: getLivePageProps,
  }[pageType];

  return propsHandler ? propsHandler(params) : getDefaultProps(params);
};

export default getPlayerProps;
