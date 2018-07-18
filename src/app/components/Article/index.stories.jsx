import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import Article from './index';
import { blockContainingText } from '../../models/blocks';

const title = 'This is a title!';
const lang = 'en-GB';

const data = {
  blocks: [
    blockContainingText('headline', 'This is a headline!'),
    {
      type: 'text',
      blockId: '2',
      model: {
        blocks: [
          {
            blockId: '2-1',
            type: 'paragraph',
            model: {
              text: 'This is some text content!',
            },
          },
          {
            blockId: '2-1',
            type: 'paragraph',
            model: {
              text: 'More text content!',
            },
          },
        ],
      },
    },
    {
      type: 'test',
      blockId: '3',
      model: {
        blocks: [
          {
            blockId: '3-1',
            type: 'test-something',
            model: {
              text: 'This is some test content!',
            },
          },
        ],
      },
    },
  ],
};

const filterData = filter => {
  const filteredBlocks = data.blocks.filter(filter);
  const blocks = { blocks: filteredBlocks };

  return blocks;
};

storiesOf('Article', module)
  .add('with just a headline', () => {
    const dataOnlyHeadline = filterData(({ type }) => type === 'headline');

    return <Article title={title} lang={lang} data={dataOnlyHeadline} />;
  })
  .add('with a headline and text', () => {
    const dataOnlyHeadlineText = filterData(
      ({ type }) => type === 'headline' || type === 'text',
    );

    return <Article title={title} lang={lang} data={dataOnlyHeadlineText} />;
  })
  .add('with a headline, text, and other blocks', () => (
    <Article title={title} lang={lang} data={data} />
  ));
