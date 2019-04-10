import getOrigin from './getOrigin';
import getEnv from './getEnv';

const getOriginContext = bbcOrigin => {
  const origin = getOrigin(bbcOrigin);
  const env = getEnv(origin);

  const isUK = !origin.includes('.com');

  return {
    origin,
    isUK,
    env,
  };
};

export default getOriginContext;
