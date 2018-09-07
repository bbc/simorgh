import React from 'react';
import Metadata from './index';
import { shouldMatchSnapshot } from '../../../helpers/tests/testHelpers';

describe('Metadata', () => {
  describe('News article', () => {
    const canonicalLink = 'https://www.bbc.com/news/articles/c0000000001o';
    const htmlAttributes = {
      lang: 'en-GB',
    };
    const title = 'An article title';
    shouldMatchSnapshot(
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
    shouldMatchSnapshot(
      'should render correctly',
      <Metadata
        canonicalLink={canonicalLink}
        htmlAttributes={htmlAttributes}
        title={title}
      />,
    );
  });
});
