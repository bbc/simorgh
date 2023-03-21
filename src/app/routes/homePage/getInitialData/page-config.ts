type Envs = 'test' | 'live';

const HOME_PAGE_CONFIG: { [key: string]: { [key in Envs]: string } } = {
  kyrgyz: {
    test: 'cm7682qz7v1t',
    live: 'crg7kj2e52nt',
  },
};

export default HOME_PAGE_CONFIG;
