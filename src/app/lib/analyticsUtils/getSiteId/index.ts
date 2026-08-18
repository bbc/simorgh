import { Environments, Services } from '#app/models/types/global';

type Props = {
  service: Services;
  env: Environments;
};

const getSiteId = ({ service, env = 'test' }: Props) => {
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
