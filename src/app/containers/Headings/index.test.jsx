import React from 'react';
import HeadingsContainer from './index';
import { textBlock } from '../../models/blocks';
import { shouldMatchSnapshot, isNull } from '../../helpers/tests/testHelpers';

describe('Headings', () => {
  describe('with no data', () => {
    isNull('should not render anything', <HeadingsContainer />);
  });

  describe('with headline data', () => {
    const headlineData = {
      ...textBlock('This is a headline!'),
      type: 'headline',
    };
    shouldMatchSnapshot(
      'should render correctly',
      <HeadingsContainer {...headlineData} />,
    );
  });
  describe('with subheading data', () => {
    const subheadingData = {
      ...textBlock('This is a subheading'),
      type: 'subheading',
    };
    shouldMatchSnapshot(
      'should render correctly',
      <HeadingsContainer {...subheadingData} />,
    );
  });
});
