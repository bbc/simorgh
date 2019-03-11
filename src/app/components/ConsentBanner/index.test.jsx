import React from 'react';
import { shouldMatchSnapshot } from '../../helpers/tests/testHelpers';
import {
  ConsentBanner,
  ConsentBannerButton,
  ConsentBannerLink,
  ConsentBannerText,
} from '.';

describe('ConsentBanner', () => {
  const props = {
    title: "We've updated our Privacy and Cookies Policy",
    text: <p>Hello</p>,
    accept: <a href="https://foobar.com">Accept</a>,
    reject: <a href="https://foobar.com">Reject</a>,
  };

  shouldMatchSnapshot('should correctly render', <ConsentBanner {...props} />);
});

describe('ConsentBannerButton', () => {
  shouldMatchSnapshot(
    'should correctly render',
    <ConsentBannerButton onClick={() => {}}>OK</ConsentBannerButton>,
  );
});

describe('ConsentBannerLink', () => {
  shouldMatchSnapshot(
    'should correctly render',
    <ConsentBannerLink href="https://hello.com" onClick={() => {}}>
      Find out whats changed
    </ConsentBannerLink>,
  );
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
