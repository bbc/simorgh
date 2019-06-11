const dynamicServiceFixtureData = {
  fooService: () => import('./fooService.js'),
};

export default dynamicServiceFixtureData;
