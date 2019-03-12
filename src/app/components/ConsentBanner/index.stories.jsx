import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
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
    We have made some <a href="https://www.bbc.com/news">important</a> changes
    to our Privacy and Cookie Policy and we want you to know what this means for
    you and your data.
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
