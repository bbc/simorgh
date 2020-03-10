import { pathOr } from 'ramda';

const extractGroupItems = type => frontPageData => {
  const featuresGroup = pathOr([], ['content', 'groups'], frontPageData).find(
    group => group.type === type,
  );
  return pathOr([], ['items'], featuresGroup);
};

const extractFeaturesData = extractGroupItems('feature-main');
const extractTopStoriesData = extractGroupItems('responsive-top-stories'); // added as an example of retrieving for top-stories

const withFrontPageData = getInitialData => async routePath => {
  const [, service] = routePath.split('/');
  const [data, frontPageData] = await Promise.all([
    getInitialData(routePath),
    fetch(`${process.env.SIMORGH_BASE_URL}/${service}.json`).then(res =>
      res.json(),
    ),
  ]);

  const features = extractFeaturesData(frontPageData);
  const topStories = extractTopStoriesData(frontPageData);

  return {
    ...data,
    pageData: {
      ...data.pageData,
      features,
      topStories,
    },
  };
};

export default withFrontPageData;
