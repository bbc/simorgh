import React from 'react';
import { latin } from '@bbc/gel-foundations/scripts';
import { shouldMatchSnapshot } from '../../../testHelpers';
import InlineContainer from '.';
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

const persianText = 'چیسربرگر';
const persianLink = inlineLinkBlock(
  persianText,
  'https://google.com',
  [fragmentBlock(persianText)],
  true,
);

const InlineContainerWithContext = blocks => (
  <ServiceContext.Provider value={{ script: latin }}>
    <InlineContainer blocks={blocks} language="fa" />
  </ServiceContext.Provider>
);

describe('InlineContainer', () => {
  shouldMatchSnapshot(
    'should render correctly',
    InlineContainerWithContext([[persianLink]]),
  );
});
