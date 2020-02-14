import getInitialData from './getInitialData';
import liveRadioJson from '../../../../data/korean/bbc_korean_radio/liveradio.json';
import fetchPageData from '../fetchPageData';

jest.mock('../fetchPageData');

fetchPageData.mockResolvedValue({
  status: 200,
  json: liveRadioJson,
});

it('should fetch page data, process the data and return it', async () => {
  const { pageData } = await getInitialData('mock-live-radio-path');
  const isProcessedPageData = pageData !== liveRadioJson;

  expect(isProcessedPageData).toBeTruthy();
});

it('should return essential data for a page to render', async () => {
  const { pageData } = await getInitialData('mock-live-radio-path');

  expect(pageData.promo.name).toEqual('BBC 코리아 라디오');
  expect(pageData.metadata.language).toEqual('ko');
  expect(pageData.promo.summary).toEqual(
    '세계와 한반도 뉴스를 공정하고 객관적으로 전달해 드립니다',
  );
  expect(pageData.content.blocks.length).toBeTruthy();
});
