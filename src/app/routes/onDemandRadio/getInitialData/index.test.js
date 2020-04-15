import getInitialData from '.';
import onDemandRadioJson from '#data/pashto/bbc_pashto_radio/w172x8nvf4bchz5.json';

fetch.mockResponse(JSON.stringify(onDemandRadioJson));

it('should return essential data for a page to render', async () => {
  const { pageData } = await getInitialData({
    path: 'mock-on-demand-radio-path',
  });

  expect(pageData.headline).toEqual('وروستي خبرونه');
  expect(pageData.episodeTitle).toEqual('04/02/2020 GMT');
  expect(pageData.summary).toEqual('د نړۍ وروستي خبرونه');
  expect(pageData.language).toEqual('ps');
});
