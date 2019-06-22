import React from 'react';
import { latin } from 'drew-testing-123/esm/scripts';
import { shouldMatchSnapshot } from '../../../testHelpers';
import ParagraphContainer from '.';
import { ServiceContext } from '../../contexts/ServiceContext';

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

const blocksMock = [fragmentBlock('This is some text.', ['bold']), inlineLink];

const ParagraphContainerWithContext = blocks => (
  <ServiceContext.Provider value={{ script: latin }}>
    <ParagraphContainer blocks={blocks} />
  </ServiceContext.Provider>
);

describe('ParagraphContainer', () => {
  shouldMatchSnapshot(
    'should render correctly',
    ParagraphContainerWithContext(blocksMock),
  );
});
