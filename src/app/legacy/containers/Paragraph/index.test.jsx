import { screen } from '@testing-library/react';
import { render } from '../../../components/react-testing-library-with-providers';
import ParagraphContainer from '.';
import getUUID from '../../../lib/utilities/getUUID';

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

jest.mock('#app/lib/utilities/getUUID', () =>
  jest.fn().mockImplementation(() => 'mockId'),
);

describe('ParagraphContainer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', () => {
    render(<ParagraphContainer blocks={blocksMock} />);
    expect(screen.getByText('This is some text.')).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('should render correctly with inline block', () => {
    render(<ParagraphContainer blocks={blocksWithInline} />);
    expect(screen.getByText('This is some text.')).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
  });
});
