import React from 'react';
import { shouldMatchSnapshot } from '../../helpers/tests/testHelpers';
import Fragment from './index';

describe('Fragment', () => {
  describe('with no attributes', () => {
    shouldMatchSnapshot(
      'should render correctly',
      <Fragment text="This is some text with no attributes" attributes={[]} />,
    );
  });

  describe('with bold attributes', () => {
    shouldMatchSnapshot(
      'should render correctly',
      <Fragment
        text="This is some text with bold attributes"
        attributes={['bold']}
      />,
    );
  });

  describe('with italic attributes', () => {
    shouldMatchSnapshot(
      'should render correctly',
      <Fragment
        text="This is some text with italic attributes"
        attributes={['italic']}
      />,
    );
  });

  describe('with bold and italic attributes', () => {
    shouldMatchSnapshot(
      'should render correctly',
      <Fragment
        text="This is some text with bold and italic attributes"
        attributes={['bold', 'italic']}
      />,
    );
  });
});
