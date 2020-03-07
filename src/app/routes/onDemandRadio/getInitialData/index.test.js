import getInitialData from '.';
import onDemandRadioJson from '#data/pashto/bbc_pashto_radio/w172x8nvf4bchz5.json';

fetch.mockResponse(JSON.stringify(onDemandRadioJson));

it('should return essential data for a page to render', async () => {
  const { pageData } = await getInitialData('mock-live-radio-path');

  expect(pageData.promo.headlines.headline).toEqual('وروستي خبرونه');
  expect(pageData.metadata.id).toEqual(
    'urn:bbc:ares:ws_media:page:bbc_pashto_radio/w172x8nvf4bchz5',
  );
  expect(pageData.metadata.language).toEqual('ps');
  expect(pageData.content.blocks.length).toBeTruthy();
});
