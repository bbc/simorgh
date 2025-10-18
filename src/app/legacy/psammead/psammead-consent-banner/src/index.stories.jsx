import React from 'react';
import { storiesOf } from '@storybook/react-webpack5';
import { withKnobs } from '@storybook/addon-knobs';
import {
  withServicesKnob,
  buildRTLSubstories,
} from '#psammead/psammead-storybook-helpers/src';
import { ConsentBanner, ConsentBannerText } from '.';
import notes from '../README.md';

const Accept = acceptText => (
  <button onClick={() => {}} type="button">
    {acceptText}
  </button>
);

const Reject = rejectText => (
  <a href="https://www.bbc.co.uk/usingthebbc/your-data-matters">{rejectText}</a>
);

const Text = ({ dir = 'ltr', shortText, text }) => (
  <ConsentBannerText dir={dir}>
    {`${text} `}
    <a href="https://www.bbc.com/news">{shortText}</a>
  </ConsentBannerText>
);

const STORY_KIND = 'Components/ConsentBanner';
const BANNER_TEXT = 'Changes to our Privacy and Cookie Policy ';
const NEWS_BODY_TEXT =
  "We've made some important changes to our Privacy and Cookies Policy and we want you to know what this means for you and your data.";
const NEWS_ACCEPT_TEXT = 'OK';
const NEWS_REJECT_TEXT = 'Find out what has changed';

storiesOf(STORY_KIND, module)
  .addDecorator(withKnobs)
  .addDecorator(withServicesKnob())
  .add(
    'default',
    ({ text, dir, service }) => {
      const shortText = (service === 'news' ? BANNER_TEXT : text)
        .trim()
        .split(' ')[0];
      return (
        <ConsentBanner
          dir={dir}
          title={
            service === 'news'
              ? "We've updated our Privacy and Cookies Policy"
              : text
          }
          text={Text({
            dir,
            text: service === 'news' ? NEWS_BODY_TEXT : text,
            shortText,
          })}
          accept={
            service === 'news' ? Accept(NEWS_ACCEPT_TEXT) : Accept(shortText)
          }
          reject={
            service === 'news' ? Reject(NEWS_REJECT_TEXT) : Reject(shortText)
          }
        />
      );
    },
    { notes, knobs: { escapeHTML: false } },
  );

buildRTLSubstories(STORY_KIND, { include: ['default'] });
