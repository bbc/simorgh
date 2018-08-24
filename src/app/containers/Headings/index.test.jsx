import React from 'react';
import HeadingsContainer from './index';
import { textBlock } from '../../models/blocks';
import {
  shallowRender,
  shouldMatchSnapshot,
  isNull,
} from '../../helpers/tests/testHelpers';

const template = (title, text, type) => {
  describe(title, () => {
    const data = {
      ...textBlock(text),
      type,
    };
    shouldMatchSnapshot(
      'should render correctly',
      shallowRender(<HeadingsContainer {...data} />),
    );
  });
};

describe('Headings', () => {
  describe('with no data', () => {
    isNull('should not render anything', shallowRender(<HeadingsContainer />));
  });

  template('with headline data', 'This is a headline!', 'headline');
  template('with subheading data', 'This is a subheading', 'subheading');
});
