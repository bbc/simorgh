import React from 'react';
import Metadata from './index';
import { shouldShallowMatchSnapshot } from '../../../helpers/tests/testHelpers';

describe('Metadata', () => {
  describe('News article', () => {
    const canonicalLink = 'https://www.bbc.com/news/articles/c0000000001o';
    const htmlAttributes = {
      lang: 'en-GB',
    };
    const title = 'An article title';
    shouldShallowMatchSnapshot(
      'should render correctly',
      <Metadata
        canonicalLink={canonicalLink}
        htmlAttributes={htmlAttributes}
        title={title}
      />,
    );
  });

  describe('News AMP article', () => {
    const canonicalLink = 'https://www.bbc.com/news/articles/amp/c0000000001o';
    const htmlAttributes = {
      amp: true,
      lang: 'en-GB',
    };
    const title = 'An article title';
    shouldShallowMatchSnapshot(
      'should render correctly',
      <Metadata
        canonicalLink={canonicalLink}
        htmlAttributes={htmlAttributes}
        title={title}
      />,
    );
  });

  describe('Persian article', () => {
    const canonicalLink = 'https://www.bbc.com/persian/articles/c0000000028o';
    const htmlAttributes = {
      lang: 'fa',
    };
    const title = 'پهپادی که برایتان قهوه می‌آورد';
    shouldShallowMatchSnapshot(
      'should render correctly',
      <Metadata
        canonicalLink={canonicalLink}
        htmlAttributes={htmlAttributes}
        title={title}
      />,
    );
  });

  describe('Persian AMP article', () => {
    const canonicalLink =
      'https://www.bbc.com/persian/articles/amp/c0000000001o';
    const htmlAttributes = {
      amp: true,
      lang: 'fa',
    };
    const title = 'پهپادی که برایتان قهوه می‌آورد';
    shouldShallowMatchSnapshot(
      'should render correctly',
      <Metadata
        canonicalLink={canonicalLink}
        htmlAttributes={htmlAttributes}
        title={title}
      />,
    );
  });
});
