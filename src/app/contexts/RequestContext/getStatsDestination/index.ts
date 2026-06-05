/* Returns stats destnation for ATI based on origin, service and env
   see table on this issue https://github.com/bbc/simorgh/issues/2995
*/

import { Environments, Services } from '#app/models/types/global';

type Props = {
  isUK?: boolean | null;
  env?: Environments | null;
  service: Services;
};

const getStatsDestination = ({ env = 'test', service }: Props) => {
  let destination = '';
  switch (service) {
    case 'japanese':
      destination = 'NEWS_LANGUAGES_GNL';
      break;
    default:
      destination = 'WS_NEWS_LANGUAGES';
  }
  return env === 'live' ? destination : `${destination}_TEST`;
};

export default getStatsDestination;
