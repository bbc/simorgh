import React from 'react';
import { render } from 'react-testing-library';
import { shouldShallowMatchSnapshot } from '../../helpers/tests/testHelpers';
import ParagraphContainer from './index';
// import react-testing methods

const fragmentBlock = (text, attributes = []) => ({
  type: 'fragment',
  model: {
    text,
    attributes,
  },
});

const inlineLinkBlock = (locator, blocks) => ({
  type: 'urlLink',
  model: {
    locator,
    blocks,
  },
});

const inlineLink = inlineLinkBlock('/bbc-test', [
  fragmentBlock('Some text'),
  fragmentBlock(' for the ', ['bold']),
  fragmentBlock(' link!', ['italic']),
]);

const blocks = [fragmentBlock('This is some text.', ['bold']), inlineLink];

describe('ParagraphContainer', () => {
  shouldShallowMatchSnapshot(
    'should render correctly',
    <ParagraphContainer blocks={blocks} />,
  );
});

describe('A react testing lib test ', () => {
  it('does a thing', () => {
    const { container } = render(<ParagraphContainer blocks={blocks} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
