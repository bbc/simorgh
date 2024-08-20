import React, { useMemo } from 'react';
import { render } from '../../../components/react-testing-library-with-providers';
import { ServiceContext } from '../../../contexts/ServiceContext';
import latin from '../../../components/ThemeProvider/fontScripts/latin';
import InlineContainer from '.';

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
const InlineContainerWithContext = ({ blocks }) => {
  const memoizedServiceContextValue = useMemo(
    () => ({ script: latin, externalLinkText: '' }),
    [],
  );
  return (
    <ServiceContext.Provider value={memoizedServiceContextValue}>
      <InlineContainer blocks={blocks} language="fa" text="text" />
    </ServiceContext.Provider>
  );
};

describe('InlineContainer', () => {
  it('should render correctly', () => {
    const { container } = render(
      <InlineContainerWithContext blocks={[persianLink]} />,
    );
    expect(container).toMatchSnapshot();
  });
});
