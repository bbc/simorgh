import React from 'react';
import { shouldMatchSnapshot } from '../../../helpers/tests/testHelpers';
import BannerText from './Text';

describe('Consent Banner Text', () => {
  shouldMatchSnapshot(
    'should correctly render banner text',
    <BannerText first="Just some text" />,
  );

  shouldMatchSnapshot(
    'should correctly render banner text with a link',
    <BannerText
      first="Some text "
      linkText="with a link"
      linkUrl="https://www.bbc.co.uk"
      last=" followed by text."
    />,
  );
});
