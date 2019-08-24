import React from 'react';
import { shouldMatchSnapshot } from '../../../testHelpers';
import Fragment from './index';
import { ServiceContext } from '../../contexts/ServiceContext';

const CreateFragment = (newsServiceContextStub, text, attributes) => (
  <ServiceContext.Provider value={newsServiceContextStub}>
    <Fragment text={text} attributes={attributes} />
  </ServiceContext.Provider>
);

const newsContext = {
  service: 'news',
};

const persianContext = {
  service: 'persian',
};

describe('Fragment', () => {
  describe('with no attributes', () => {
    shouldMatchSnapshot(
      'should render just text',
      CreateFragment(newsContext, 'This is some text with no attributes', []),
    );
  });

  describe('with bold attributes', () => {
    shouldMatchSnapshot(
      'should render text wrapped in a bold DOM element',
      CreateFragment(newsContext, 'This is some text with bold attributes', [
        'bold',
      ]),
    );
  });

  describe('with italic attributes', () => {
    shouldMatchSnapshot(
      'should render text wrapped in an italic DOM element',
      CreateFragment(newsContext, 'This is some text with italic attributes', [
        'italic',
      ]),
    );
  });

  describe('with bold and italic attributes', () => {
    shouldMatchSnapshot(
      'should render text wrapped in bold and italic DOM elements',
      CreateFragment(
        newsContext,
        'This is some text with bold and italic attributes',
        ['bold', 'italic'],
      ),
    );
  });

  describe('with an unknown attribute', () => {
    shouldMatchSnapshot(
      'should ignore the attribute',
      CreateFragment(
        newsContext,
        'This is some text with a bold and unknown attribute',
        ['bold', 'unknown'],
      ),
    );
  });

  describe('with italic attributes in Farsi', () => {
    shouldMatchSnapshot(
      'should render text wrapped in an italic DOM element',
      CreateFragment(
        persianContext,
        'This is some text with italic attributes',
        ['italic'],
      ),
    );
  });
});
