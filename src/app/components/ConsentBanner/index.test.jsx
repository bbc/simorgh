import React from 'react';
import path from 'path';
import fakeProps from 'react-fake-props';

import { shouldMatchSnapshot } from '../../../testHelpers';
import { ConsentBanner, ConsentBannerText } from '.';

const baseProps = fakeProps(path.join(__dirname, './index.jsx'));

describe('ConsentBanner', () => {
  shouldMatchSnapshot(
    'should correctly render',
    <ConsentBanner {...baseProps} />,
  );

  describe('with hidden attribute on wrapper', () => {
    const props = {
      ...baseProps,
      hidden: true,
    };

    shouldMatchSnapshot(
      'should correctly render',
      <ConsentBanner {...props} />,
    );
  });
});

describe('ConsentBannerText', () => {
  shouldMatchSnapshot(
    'should correctly render',
    <ConsentBannerText>
      We have made some important changes to our Privacy and Cookies Policy and
      we want you to know what this means for you and your data.
    </ConsentBannerText>,
  );
});
