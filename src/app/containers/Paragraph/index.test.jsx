import React from 'react';
// Import a react-testing-library method
import { render } from 'react-testing-library';
import Enzyme from 'enzyme';
// Enzyme adapter provides compatibility with React 16.x:
import Adapter from 'enzyme-adapter-react-16';
import { shouldShallowMatchSnapshot } from '../../helpers/tests/testHelpers';
import ParagraphContainer from './index';

// Cnfigure enzyme to use the adapter you want it to use:
Enzyme.configure({ adapter: new Adapter() });

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

describe('Existing snapshot test', () => {
  describe('ParagraphContainer', () => {
    shouldShallowMatchSnapshot(
      'should render correctly',
      <ParagraphContainer blocks={blocks} />,
    );
  });
});

describe('A react-testing-library snapshot test', () => {
  it('Should render a ParagraphContainer', () => {
    const { container } = render(<ParagraphContainer blocks={blocks} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});

describe('Enzyme tests', () => {
  describe('Enzyme mount', () => {
    it('Should mount a paragraph without throwing an error', () => {
      const wrapper = Enzyme.mount(<ParagraphContainer blocks={blocks} />);
      expect(wrapper.length).toBe(1);
    });
  });

  describe('Enzyme shallow render', () => {
    it('Should render correctly with no props', () => {
      const component = Enzyme.shallow(<ParagraphContainer blocks={blocks} />);
      expect(component).toMatchSnapshot();
    });

    it('Should render correctly with text', () => {
      const component = Enzyme.shallow(<ParagraphContainer blocks={blocks} />);
      expect(component).toMatchSnapshot();
    });
  });

  describe('Enzyme rendering to static HTML', () => {
    it('Should render to static HTML', () => {
      expect(
        Enzyme.render(<ParagraphContainer blocks={blocks} />).text(),
      ).toEqual('This is some text.Some text for the  link!');
    });
  });
});
