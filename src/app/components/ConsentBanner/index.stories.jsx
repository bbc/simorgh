import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import ConsentBanner from '.';

const props = {
  title: 'Let us know you agree to collecting analytics',
  description: 'Text here describing why this is necessary.',
  accept: 'Accept',
  reject: 'Reject',
  acceptButtonProps: {},
  rejectButtonProps: {},
  idPrompt: 'consent-prompt',
};

storiesOf('ConsentBanner', module).add('default', () => (
  <ConsentBanner {...props} />
));
