import React from 'react';
import { latin } from '@bbc/gel-foundations/scripts';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import InlineContainer from '.';
import { ServiceContext } from '#contexts/ServiceContext';

const fragmentBlock = (text, attributes = []) => ({
  id: '113144',
  type: 'fragment',
  model: {
    text,
    attributes,
  },
});

const inlineLinkBlock = (text, locator, blocks, isExternal) => ({
  id: '123124',
  type: 'urlLink',
  model: {
    text,
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

// text is passed here just to satisfy the prop type warnings but the top level text prop is currently not used
const InlineContainerWithContext = (blocks) => (
  <ServiceContext.Provider value={{ script: latin, externalLinkText: '' }}>
    <InlineContainer blocks={blocks} language="fa" text="text" />
  </ServiceContext.Provider>
);

describe('InlineContainer', () => {
  shouldMatchSnapshot(
    'should render correctly',
    InlineContainerWithContext([persianLink]),
  );
});
