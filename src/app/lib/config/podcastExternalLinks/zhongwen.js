import withContext from '../../../contexts/utils/withContext';

const common = {
  p02pc9xp: [
    {
      linkText: 'Spotify',
      linkUrl: 'https://open.spotify.com/show/0HCq2CZEdD5egLoE4t4C8t',
    },
    {
      linkText: 'Apple',
      linkUrl:
        'https://podcasts.apple.com/us/podcast/bbc-%E6%99%82%E4%BA%8B%E4%B8%80%E5%91%A8-newsweek-cantonese/id415474539',
    },
  ],
};

export const externalLinks = {
  simp: { ...common },
  trad: { ...common },
};

export default withContext(externalLinks);
