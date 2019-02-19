import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import ConsentBanner from '.';

const props = {
  title: 'Agree to collecting analytics heading',
  description: 'Text here describing why this is necessary.',
  accept: 'Accept',
  reject: 'Reject',
  acceptButtonProps: {},
  rejectButtonProps: {},
  promptId: 'consent-prompt',
};

storiesOf('ConsentBanner', module).add('default', () => (
  <ConsentBanner {...props} />
));
