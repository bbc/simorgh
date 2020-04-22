import React from 'react';
import { wait, render } from '@testing-library/react';
import RecommendationsContainer from '.';

const assetUri = '/arabic/middleeast-51679521';
const caminoResponseData = {
  items: [
    {
      assetUri: '/arabic/middleeast-51699668',
      ampUri: '/arabic/amp/middleeast-51699668',
      shortHeadline: 'الحرب في سوريا: الجيش التركي يُسقط مقاتلتين سوريتين',
      imageHref:
        'http://c.files.bbci.co.uk/32A9/production/_111096921_cfb46f5b-bbc4-4479-8c6c-ca03d690a3de.jpg',
    },
    {
      assetUri: '/arabic/middleeast-51658671',
      ampUri: '/arabic/amp/middleeast-51658671',
      shortHeadline: 'مقتل 33 جنديا تركيا في غارة للجيش السوري في إدلب',
      imageHref:
        'http://c.files.bbci.co.uk/E34A/production/_111068185_tv060271948.jpg',
    },
    {
      assetUri: '/arabic/middleeast-51443162',
      ampUri: '/arabic/amp/middleeast-51443162',
      shortHeadline: 'مقتل جنود أتراك في قصف للقوات السورية على إدلب',
      imageHref:
        'http://c.files.bbci.co.uk/52AB/production/_110836112_gettyimages-1181850242.jpg',
    },
    {
      assetUri: '/arabic/middleeast-51355355',
      ampUri: '/arabic/amp/middleeast-51355355',
      shortHeadline:
        'أنقرة تعلن "قتل العشرات" من القوات الحكومية السورية عقب مقتل جنود أتراك',
      imageHref:
        'http://c.files.bbci.co.uk/F8B1/production/_110756636_d9ccdd75-2f84-4a48-87f2-6b779ee4b9d3.jpg',
    },
  ],
};

describe('RecommendationsContainer', () => {
  afterEach(() => {
    fetch.resetMocks();
  });
  it('should fetch data from the camino API', async () => {
    fetch.mockResponse(JSON.stringify(caminoResponseData));
    const { container } = render(
      <RecommendationsContainer assetUri={assetUri} />,
    );
    await wait(() => {
      expect(container).toMatchSnapshot();
    });
  });
});
