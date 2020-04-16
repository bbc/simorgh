import getInitialData from '.';
import liveRadioJson from '#data/korean/bbc_korean_radio/liveradio.json';

fetch.mockResponse(JSON.stringify(liveRadioJson));

it('should return essential data for a page to render', async () => {
  const { pageData } = await getInitialData({ path: 'mock-live-radio-path' });

  expect(pageData.name).toEqual('BBC 코리아 라디오');
  expect(pageData.language).toEqual('ko');
  expect(pageData.summary).toEqual(
    '세계와 한반도 뉴스를 공정하고 객관적으로 전달해 드립니다',
  );
  expect(pageData.content.blocks.length).toBeTruthy();
});
