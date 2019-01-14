import React from 'react';
// Import a react-testing-library method
import { cleanup, render } from 'react-testing-library';
import HeadingsContainer from './index';
import { textBlock } from '../../models/blocks';
import {
  shouldShallowMatchSnapshot,
  isNull,
} from '../../helpers/tests/testHelpers';

afterEach(cleanup);

describe('React-testing-library snapshot tests', () => {
  const template = (title, text, type) => {
    describe(title, () => {
      const data = {
        ...textBlock(text),
        type,
      };
      it(`Should render a HeadlineContainer ${title}`, () => {
        const { baseElement } = render(<HeadingsContainer {...data} />);
        expect(baseElement.firstChild).toMatchSnapshot();
      });
    });
  };
  template('with headline data', 'This is a headline!', 'headline');

  template('with subheadline data', 'This is a subheadline', 'subheadline');

  it('return null with no data', () => {
    const { container } = render(<HeadingsContainer />);
    expect(container.firstChild).toMatchSnapshot();
  });
});

describe('Existing Jest snapshot tests', () => {
  const template = (title, text, type) => {
    describe(title, () => {
      const data = {
        ...textBlock(text),
        type,
      };
      shouldShallowMatchSnapshot(
        'should render correctly',
        <HeadingsContainer {...data} />,
      );
    });
  };

  describe('Headings', () => {
    describe('with no data', () => {
      isNull('should not render anything', <HeadingsContainer />);
    });

    template('with headline data', 'This is a headline!', 'headline');
    template('with subheadline data', 'This is a subheadline', 'subheadline');
  });
});
