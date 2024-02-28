/* Returns stats destnation for ATI based on origin, service and env
   see table on this issue https://github.com/bbc/simorgh/issues/2995
*/

import { Environments, Services } from '#app/models/types/global';

type Props = {
  isUK?: boolean | null;
  env?: Environments | null;
  service: Services;
};

const getStatsDestination = ({ isUK = true, env = 'test', service }: Props) => {
  let destination = '';
  switch (service) {
    case 'news':
      // checks if "news" service is in the UK or not and set apprioprate destination
      destination = isUK !== false ? 'NEWS_PS' : 'NEWS_GNL';
      break;
    case 'cymrufyw':
    case 'naidheachdan':
      // checks if "cymrufyw" or "naidheachdan" service is in the UK or not and set apprioprate destination
      destination = isUK !== false ? 'NEWS_LANGUAGES_PS' : 'NEWS_LANGUAGES_GNL';
      break;
    case 'japanese':
      destination = 'NEWS_LANGUAGES_GNL';
      break;
    case 'scotland':
      destination = 'PS_HOMEPAGE';
      break;
    case 'archive':
      destination = 'BBC_ARCHIVE_PS';
      break;
    case 'newsround':
      destination = 'NEWSROUND';
      break;
    case 'sport':
      destination = isUK !== false ? 'SPORT_PS' : 'SPORT_GNL';
      break;
    case 'ws':
      destination = 'DEFAULT';
      break;
    default:
      destination = 'WS_NEWS_LANGUAGES';
  }
  return env === 'live' ? destination : `${destination}_TEST`;
};

export default getStatsDestination;
