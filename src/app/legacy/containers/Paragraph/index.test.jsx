import React, { useMemo } from 'react';
import { render } from '../../../components/react-testing-library-with-providers';
import { ServiceContext } from '../../../contexts/ServiceContext';
import ThemeProvider from '../../../components/ThemeProvider';
import latin from '../../../components/ThemeProvider/fontScripts/latin';
import ParagraphContainer from '.';
import getUUID from '../../../lib/utilities/getUUID';

jest.mock('../../../components/ThemeProvider');

const fragmentBlock = (text, attributes = []) => ({
  type: 'fragment',
  id: `${getUUID()}${text}`,
  model: {
    text,
    attributes,
  },
});

const inlineLinkBlock = (text, locator, blocks, isExternal) => ({
  type: 'urlLink',
  id: `${getUUID()}${text}`,
  model: {
    text,
    locator,
    blocks,
    isExternal,
  },
});

const inlineSpanBlock = (blocks, language, text) => ({
  type: 'inline',
  id: `${getUUID()}${text}`,
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
      <ThemeProvider service="news" variant="default">
        <ParagraphContainer blocks={blocks} />
      </ThemeProvider>
    </ServiceContext.Provider>
  );
};

jest.mock('#app/lib/utilities/getUUID', () =>
  jest.fn().mockImplementation(() => 'mockId'),
);

describe('ParagraphContainer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

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
