import getInitialData from './getInitialData';
import liveRadioJson from '../../../../data/korean/bbc_korean_radio/liveradio.json';
import fetchPageData from '../fetchPageData';

jest.mock('../fetchPageData');

fetchPageData.mockImplementation(() => ({
  status: 200,
  json: liveRadioJson,
}));

it('should fetch page data, process the data and return it', async () => {
  const { json } = getInitialData('mock-live-radio-path');
  const isProcessedPageData = json !== liveRadioJson;

  expect(isProcessedPageData).toBeTruthy();
});

it('should return essential data for a page to render', async () => {
  const { json } = getInitialData('mock-live-radio-path');

  expect(json.promo.name).toEqual('BBC 코리아 라디오');
  expect(json.metadata.language).toEqual('ko');
  expect(json.promo.summary).toEqual(
    '세계와 한반도 뉴스를 공정하고 객관적으로 전달해 드립니다',
  );
  expect(json.content.blocks.length).toBeTruthy();
});
