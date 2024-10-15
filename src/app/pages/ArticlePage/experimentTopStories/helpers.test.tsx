import {
  enableExperimentTopStories,
  insertExperimentTopStories,
} from './helpers';
import { topStoriesList } from '../PagePromoSections/TopStoriesSection/fixture/index';

describe('AMP top stories experiment', () => {
  describe('enableExperimentTopStories()', () => {
    it('should return true if props match conditions.', () => {
      expect(
        enableExperimentTopStories({
          isAmp: true,
          pathname: '/news/articles/c6v11qzyv8po.amp',
          service: 'news',
        }),
      ).toBe(true);
    });
    it.each`
      testDescription                                | isAmp    | pathname                             | service
      ${'all props are undefined'}                   | ${false} | ${undefined}                         | ${undefined}
      ${'only isAmp is true'}                        | ${true}  | ${undefined}                         | ${undefined}
      ${'only pathname is undefined'}                | ${true}  | ${undefined}                         | ${'news'}
      ${'only pathname is defined and valid'}        | ${false} | ${'/news/articles/c6v11qzyv8po.amp'} | ${undefined}
      ${'all props defined but pathname is invalid'} | ${false} | ${'/news/articles/c1231qzyv8po.amp'} | ${undefined}
      ${'only service is undefined'}                 | ${true}  | ${'/news/articles/c6v11qzyv8po.amp'} | ${undefined}
      ${'only service is defined and valid'}         | ${false} | ${undefined}                         | ${'news'}
      ${'all props defined but service is invalid'}  | ${true}  | ${'/news/articles/c6v11qzyv8po.amp'} | ${'igbo'}
    `(
      'should return false if $testDescription.',
      ({ isAmp, id, service }) => {
        expect(
          enableExperimentTopStories({
            isAmp,
            id,
            service,
          }),
        ).toBe(false);
      },
    );
  });

  describe('insertExperimentTopStories()', () => {
    const mockTextBlock = {
      type: 'text',
      model: {
        blocks: [],
      },
    };
    const expectedExperimentTopStoriesBlock = {
      type: 'experimentTopStories',
      model: topStoriesList,
      id: 'experimentTopStories-1',
    };

    const blocksEvenLength = [mockTextBlock, mockTextBlock];
    const blocksOddLength = [mockTextBlock, mockTextBlock, mockTextBlock];

    const expectedBlocksEvenLength = [
      mockTextBlock,
      expectedExperimentTopStoriesBlock,
      mockTextBlock,
    ];
    const expectedBlocksOddLength = [
      mockTextBlock,
      expectedExperimentTopStoriesBlock,
      mockTextBlock,
      mockTextBlock,
    ];

    it.each`
      testType  | inputBlocks         | expectedOutput
      ${'even'} | ${blocksEvenLength} | ${expectedBlocksEvenLength}
      ${'odd'}  | ${blocksOddLength}  | ${expectedBlocksOddLength}
    `(
      'should insert experimentTopStories block into blocks array in the correct position when blocks.length is $testType',
      ({ inputBlocks, expectedOutput }) => {
        expect(
          insertExperimentTopStories({
            blocks: inputBlocks,
            topStoriesContent: topStoriesList,
          }),
        ).toEqual(expectedOutput);
      },
    );
  });
});
