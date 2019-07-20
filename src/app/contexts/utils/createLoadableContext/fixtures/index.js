const dynamicServiceFixtureData = {
  fooService: {
    loader: () => import('./fooService.js'),
    webpack: () => [require.resolveWeak('./fooService.js')],
  },
};

export default dynamicServiceFixtureData;
