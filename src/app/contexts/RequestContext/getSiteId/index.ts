import { Environments, Services } from '#app/models/types/global';

type Props = {
  env?: Environments | null;
  service: Services;
};

const getSiteId = ({ env = 'test', service }: Props) => {
  let siteId: number;
  switch (service) {
    case 'japanese':
      siteId = env === 'live' ? 646753 : 598290;
      break;
    default:
      siteId = env === 'live' ? 598342 : 598343;
  }
  return siteId;
};

export default getSiteId;
