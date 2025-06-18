import React from 'react';
import { render } from '@testing-library/react';
import { shouldMatchSnapshot } from '#psammead/psammead-test-helpers/src';
import { ServiceContext } from '../../../contexts/ServiceContext';
import FragmentContainer from './index';

const newsContext = {
  service: 'news',
};

const persianContext = {
  service: 'persian',
};

const CreateFragment = ({
  context = newsContext,
  attributes = [],
  text = '',
} = {}) => (
  <ServiceContext.Provider value={context}>
    <FragmentContainer text={text} attributes={attributes} />
  </ServiceContext.Provider>
);

describe('Fragment', () => {
  describe('with no attributes', () => {
    shouldMatchSnapshot(
      'should render just text',
      CreateFragment({ text: 'This is some text with no attributes' }),
    );
  });

  describe('with bold attributes', () => {
    shouldMatchSnapshot(
      'should render text wrapped in a bold DOM element',
      CreateFragment({
        text: 'This is some text with bold attributes',
        attributes: ['bold'],
      }),
    );
  });

  describe('with italic attributes', () => {
    shouldMatchSnapshot(
      'should render text wrapped in an italic DOM element',
      CreateFragment({
        text: 'This is some text with italic attributes',
        attributes: ['italic'],
      }),
    );
  });

  describe('with bold and italic attributes', () => {
    shouldMatchSnapshot(
      'should render text wrapped in bold and italic DOM elements',
      CreateFragment({
        text: 'This is some text with bold and italic attributes',
        attributes: ['bold', 'italic'],
      }),
    );
  });

  describe('with an unknown attribute', () => {
    shouldMatchSnapshot(
      'should ignore the attribute',
      CreateFragment({
        text: 'This is some text with a bold and unknown attribute',
        attributes: ['bold', 'unknown'],
      }),
    );
  });

  describe('with italic attributes in Farsi', () => {
    shouldMatchSnapshot(
      'should render text wrapped in an italic DOM element',
      CreateFragment({
        context: persianContext,
        text: 'This is some text with italic attributes',
        attributes: ['italic'],
      }),
    );
  });

  describe('should emit an empty div when provided with no content', () => {
    render(CreateFragment());
    expect(document.querySelector('div')).toBeInTheDocument();
    expect(document.querySelector('div').textContent.trim()).toBe('');
  });
});
