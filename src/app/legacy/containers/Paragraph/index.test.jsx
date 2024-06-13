import React, { useMemo } from 'react';
import { v4 as uuid } from 'uuid';
import { render } from '../../../components/react-testing-library-with-providers';
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

const ParagraphContainerWithContext = ({ blocks }) => {
  const memoizedServiceContextValue = useMemo(
    () => ({ script: latin, service: 'news' }),
    [],
  );

  return (
    <ServiceContext.Provider value={memoizedServiceContextValue}>
      <ParagraphContainer blocks={blocks} />
    </ServiceContext.Provider>
  );
};

describe('ParagraphContainer', () => {
  it('should render correctly', () => {
    const { container } = render(
      <ParagraphContainerWithContext blocks={blocksMock} />,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render correctly with inline block', () => {
    const { container } = render(
      <ParagraphContainerWithContext blocks={blocksWithInline} />,
    );
    expect(container).toMatchSnapshot();
  });
});
