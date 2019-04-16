import React from 'react';
import { shouldShallowMatchSnapshot } from '../../helpers/tests/testHelpers';
import ParagraphContainer from './index';

const fragmentBlock = (text, attributes = []) => ({
  type: 'fragment',
  model: {
    text,
    attributes,
  },
});

const inlineLinkBlock = (locator, blocks, isExternal) => ({
  type: 'urlLink',
  model: {
    locator,
    blocks,
    isExternal,
  },
});

const inlineLink = inlineLinkBlock(
  '/bbc-test',
  [
    fragmentBlock('Some text'),
    fragmentBlock(' for the ', ['bold']),
    fragmentBlock(' link!', ['italic']),
  ],
  false,
);

const blocks = [fragmentBlock('This is some text.', ['bold']), inlineLink];

describe('ParagraphContainer', () => {
  shouldShallowMatchSnapshot(
    'should render correctly',
    <ParagraphContainer blocks={blocks} />,
  );
});
