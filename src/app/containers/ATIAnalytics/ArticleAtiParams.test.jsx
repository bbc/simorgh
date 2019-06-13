import React from 'react';
import renderer from 'react-test-renderer';
import ArticleAtiParams from './ArticleAtiParams';
import { ServiceContext } from '../../contexts/ServiceContext';
import { RequestContextProvider } from '../../contexts/RequestContext';

const mockArticleData = { metadata: {}, content: {}, promo: {} };

describe('ArticleAtiParams', () => {
  describe('atiPageViewParams is called ', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should call atiPageViewParams with specific params', () => {
      const mock = jest.fn();
      jest.mock('./atiUrl', () => ({ atiPageViewParams: mock }));
      const { atiPageViewParams } = require('./atiUrl');
      jest.mock('../../lib/analyticsUtils/article', () => ({
        getLanguage: 'language',
      }));

      // atiPageViewParams = jest.fn();
      // jest.mock(atiPageViewParams);
      // Object.defineProperty(atiPageViewParams, 'doOneThing', {
      //   value: jest.fn(),
      // });
      // const spy = jest.spyOn(ArticleAtiParams, 'atiPageViewParams');

      const Component = (newsServiceContextStub, requestContextStub) => (
        <ServiceContext.Provider value={newsServiceContextStub}>
          <RequestContextProvider {...requestContextStub}>
            <ArticleAtiParams articleData={mockArticleData} />
          </RequestContextProvider>
        </ServiceContext.Provider>
      );
      const newsServiceContextStub = {
        service: 'news',
      };
      const requestContextStub = {
        isUK: true,
        platform: 'canonical',
        statsDestination: 'NEWS_PS_TEST',
      };
      renderer
        .create(Component(newsServiceContextStub, requestContextStub))
        .toJSON();
      // expect(tree).toMatchSnapshot();

      expect(mock).toHaveBeenCalledTimes(1);
    });
  });

  xdescribe('analytics utilities are called with correct params', () => {
    it('should call each analytics util correctly', () => {
      const { getLanguage } = require('../../lib/analyticsUtils/article');
      expect(getLanguage).toHaveBeenCalledWith(mockArticleData);
    });
  });
});
//   expect(atiPageViewParams).toHaveBeenCalledWith({
//     contentType,
//     language,
//     ldpThingIds,
//     ldpThingLabels,
//     optimoUrn,
//     pageIdentifier,
//     pageTitle,
//     timePublished,
//     timeUpdated,
//     isUK,
//     platform,
//     service,
//     statsDestination,
//   });
// });

// const tests = [
//   { description: '', func: getLanguage, args: articleData },
//   {
//     description: '',
//     func: getThingAttributes,
//     args: ('thingId', articleData),
//   },
//   {
//     description: '',
//     func: getThingAttributes,
//     args: ('thingLabel', articleData),
//   },
//   { description: '', func: getOptimoUrn, args: articleData },
//   {
//     description: '',
//     func: getPageIdentifier,
//     args: (service, articleData),
//   },
//   { description: '', func: getPromoHeadline, args: articleData },
//   {
//     description: '',
//     func: getPublishedDatetime,
//     args: ('firstPublished', articleData),
//   },
//   {
//     description: '',
//     func: getPublishedDatetime,
//     args: ('lastPublished', articleData),
//   },
// ];
// tests.forEach(({ func, args }) => {
//   it(description, () => {
//     expect(func).toHaveBeenCalledWith({ args });
//   });
// });

// const contentType = '';
// const language = '';
// const ldpThingIds = '';
// const ldpThingLabels = '';
// const optimoUrn = '';
// const pageIdentifier = '';
// const pageTitle = '';
// const timePublished = '';
// const timeUpdated = '';
// const isUK = '';
// const platform = '';
// const service = '';
// const statsDestination = '';

// xdescribe('ArticleAtiParams', () => {
//   let container;
//   beforeEach(() => {
//     container = document.createElement('div');
//     document.body.appendChild(container);
//   });

//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   it('should return the query parameters for the ati article', () => {
//     jest.mock('./atiUrl', () => jest.fn());
//     const { atiPageViewParams } = require('./atiUrl'); // eslint-diable-line global-require
//     // jest.mock('../../lib/analyticsUtils/article', () => jest.fn());
//     // const { getLanguage } = require('../../lib/analyticsUtils/article');

//     act(() => {
//       ReactDOM.render(
//         <ArticleAtiParams articleData={articleData} />,
//         container,
//       );
//     });

//     expect(atiPageViewParams).toHaveBeenCalledTimes(1);
//     // expect(ArticleAtiParams).toHaveBeenCalledTimes(1);
//     // expect(getLanguage).toHaveBeenCalledWith({ articleData });
//   });
// });
