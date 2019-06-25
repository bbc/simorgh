import React from 'react';
import { shouldMatchSnapshot } from '../../../testHelpers';
import Fragment from './index';

describe('Fragment', () => {
  describe('with no attributes', () => {
    shouldMatchSnapshot(
      'should render just text',
      <Fragment text="This is some text with no attributes" attributes={[]} />,
    );
  });

  describe('with bold attributes', () => {
    shouldMatchSnapshot(
      'should render text wrapped in a bold DOM element',
      <Fragment
        text="This is some text with bold attributes"
        attributes={['bold']}
      />,
    );
  });

  describe('with italic attributes', () => {
    shouldMatchSnapshot(
      'should render text wrapped in an italic DOM element',
      <Fragment
        text="This is some text with italic attributes"
        attributes={['italic']}
      />,
    );
  });

  describe('with bold and italic attributes', () => {
    shouldMatchSnapshot(
      'should render text wrapped in bold and italic DOM elements',
      <Fragment
        text="This is some text with bold and italic attributes"
        attributes={['bold', 'italic']}
      />,
    );
  });

  describe('with an unknown attribute', () => {
    shouldMatchSnapshot(
      'should ignore the attribute',
      <Fragment
        text="This is some text with a bold and unknown attribute"
        attributes={['bold', 'unknown']}
      />,
    );
  });
});
