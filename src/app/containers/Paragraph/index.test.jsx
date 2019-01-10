import React from 'react';
import { render } from 'react-testing-library';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shouldShallowMatchSnapshot } from '../../helpers/tests/testHelpers';
import ParagraphContainer from './index';
// Enzyme adapter provides compatibility with React 16.x:

// configure enzyme to use the adapter you want it to use:
Enzyme.configure({ adapter: new Adapter() });

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

describe('The Enzyme tests', () => {
  describe('Paragraph tested with Enzyme mount', () => {
    it('should mount a paragraph without throwing an error', () => {
      const wrapper = Enzyme.mount(<ParagraphContainer blocks={blocks} />);
      expect(wrapper.length).toBe(1);
    });
  });

  describe('Paragraph tested with Enzyme shallow render', () => {
    it('should render correctly with no props', () => {
      const component = Enzyme.shallow(<ParagraphContainer blocks={blocks} />);
      expect(component).toMatchSnapshot();
    });

    it('should render correctly with text', () => {
      const component = Enzyme.shallow(<ParagraphContainer blocks={blocks} />);
      expect(component).toMatchSnapshot();
    });
  });

  describe('Paragraph tested with Enzyme rendering to static HTML', () => {
    it('should render to static HTML', () => {
      expect(
        Enzyme.render(<ParagraphContainer blocks={blocks} />).text(),
      ).toEqual('This is some text.Some text for the  link!');
    });
  });
});
