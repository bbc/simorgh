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
  <ConsentBannerLink href="https://www.bbc.co.uk/usingthebbc/your-data-matters">
    Find out what&apos;s changed
  </ConsentBannerLink>
);

const Text = (
  <ConsentBannerText>
    This is some text with <a href="https://www.bbc.com/news">a link</a> inside
    the consent banner. We have made some important changes to our Privacy and
    Cookie Policy.
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
