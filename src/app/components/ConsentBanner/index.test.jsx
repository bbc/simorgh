import React from 'react';
import { shouldMatchSnapshot } from '../../helpers/tests/testHelpers';
import ConsentBanner from '.';

describe('Consent Banner', () => {
  const props = {
    title: 'Let us know you agree to collecting analytics',
    description: 'Text here describing why this is necessary.',
    accept: 'Accept',
    reject: 'Reject',
    acceptButtonProps: {},
    rejectButtonProps: {},
    promptId: 'consent-prompt',
  };
  shouldMatchSnapshot(
    'should render a prompt box',
    <ConsentBanner {...props} />,
  );
});
