import React from 'react';
import uuid from 'uuid';

import { shouldMatchSnapshot } from '../../../testHelpers';
import ParagraphContainer from '.';
import { ServiceContext } from '../../contexts/ServiceContext';

const fragmentBlock = (text, attributes = []) => ({
  type: 'fragment',
  id: uuid(),
  model: {
    text,
    attributes,
  },
});

const inlineLinkBlock = (locator, blocks, isExternal) => ({
  type: 'urlLink',
  id: uuid(),
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

const blocksMock = [fragmentBlock('This is some text.', ['bold']), inlineLink];

const ParagraphContainerWithContext = blocks => (
  <ServiceContext.Provider value={{ script: latin, service: 'news' }}>
    <ParagraphContainer blocks={blocks} />
  </ServiceContext.Provider>
);

describe('ParagraphContainer', () => {
  shouldMatchSnapshot(
    'should render correctly',
    ParagraphContainerWithContext(blocksMock),
  );
});
