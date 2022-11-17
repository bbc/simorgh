import React from 'react';
import { v4 as uuid } from 'uuid';
import { shouldMatchSnapshot } from '#psammead/psammead-test-helpers/src';
import { ServiceContext } from '../../../contexts/ServiceContext';
import latin from '../../../components/ThemeProvider/fontScripts/latin';
import ParagraphContainer from '.';

const fragmentBlock = (text, attributes = []) => ({
  type: 'fragment',
  id: uuid(),
  model: {
    text,
    attributes,
  },
});

const inlineLinkBlock = (text, locator, blocks, isExternal) => ({
  type: 'urlLink',
  id: uuid(),
  model: {
    text,
    locator,
    blocks,
    isExternal,
  },
});

const inlineSpanBlock = (blocks, language, text) => ({
  type: 'inline',
  id: uuid,
  model: {
    blocks,
    language,
    text,
  },
});

const persianText = 'چیسربرگر';
const persianLink = inlineLinkBlock(
  persianText,
  'https://google.com',
  [fragmentBlock(persianText)],
  true,
);

const inlinePersianBlock = inlineSpanBlock([persianLink], 'fa', persianText);

const inlineLink = inlineLinkBlock(
  'a link',
  '/bbc-test',
  [
    fragmentBlock('Some text'),
    fragmentBlock(' for the ', ['bold']),
    fragmentBlock(' link!', ['italic']),
  ],
  false,
);

const blocksMock = [fragmentBlock('This is some text.', ['bold']), inlineLink];

const blocksWithInline = [
  fragmentBlock('This is some text.', ['bold']),
  inlinePersianBlock,
];

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

  shouldMatchSnapshot(
    'should render correctly with inline block',
    ParagraphContainerWithContext(blocksWithInline),
  );
});
