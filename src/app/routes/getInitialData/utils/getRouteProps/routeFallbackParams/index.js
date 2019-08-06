import services from '../../../../../lib/config/services/loadableConfig';

export const fallbackAmpParam = url => {
  const ampRegex = /\.amp$/;
  return ampRegex.test(url);
};

export const fallbackServiceParam = url => {
  const pathParts = url.split('/').filter(Boolean);

  if (pathParts[0] && Object.keys(services).includes(pathParts[0])) {
    return pathParts[0];
  }

  return 'news';
};
