import path from 'ramda/src/path';
import fetchPageData from '../../utils/fetchPageData';

const getBrandTitle = path(['metadata', 'title']);
const getMetadata = path(['metadata']);
const getEpisodeTitle = path(['content', 'blocks', '0', 'title']);
const getHeadline = path(['promo', 'headlines', 'headline']);
const getShortSynopsis = path(['promo', 'media', 'synopses', 'short']);
const getSummary = path(['content', 'blocks', '0', 'synopses', 'short']);

export default async pathname => {
  const { json, ...rest } = await fetchPageData(pathname);

  return {
    ...rest,
    ...(json && {
      pageData: {
        metadata: getMetadata(json),
        brandTitle: getBrandTitle(json),
        episodeTitle: getEpisodeTitle(json),
        headline: getHeadline(json),
        shortSynopsis: getShortSynopsis(json),
        summary: getSummary(json),
      },
    }),
  };
};
