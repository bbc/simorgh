import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import InlineLink from '@bbc/psammead-inline-link';
import {
  ConsentBanner,
  ConsentBannerButton,
  ConsentBannerLink,
  ConsentBannerText,
} from '.';

const Accept = <ConsentBannerButton onClick={() => {}}>OK</ConsentBannerButton>;

const Reject = (
  <ConsentBannerLink href="https://hello.com" onClick={() => {}}>
    Find out whats changed
  </ConsentBannerLink>
);

const Text = (
  <ConsentBannerText>
    We have made some important changes to our Privacy and{' '}
    <InlineLink href="https://www.bbc.com/news">Cookie</InlineLink> Policy and
    we want you to know what this means for you and your data.
  </ConsentBannerText>
);

const props = {
  title: "We've updated our Privacy and Cookies Policy",
  text: Text,
  accept: Accept,
  reject: Reject,
};

storiesOf('ConsentBanner', module).add('default', () => (
  <ConsentBanner {...props} />
));
