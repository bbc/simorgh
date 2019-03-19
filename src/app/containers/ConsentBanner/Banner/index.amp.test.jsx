import React from 'react';
import { shouldMatchSnapshot } from '../../../helpers/tests/testHelpers';
import { ServiceContextProvider } from '../../../contexts/ServiceContext';
import Banner from './index.amp';

describe('Amp Consent Banner Container - Banner', () => {
  beforeEach(() => {
    // TODO mock AmpHelpers.Action
  });

  shouldMatchSnapshot(
    'should correctly render privacy banner',
    <ServiceContextProvider service="news">
      <Banner
        type="privacy"
        onAccept={{ tap: [`cookieId.show, privacyId.hide`] }}
        onReject={{ tap: [`cookieId.show, privacyId.hide`] }}
      />
    </ServiceContextProvider>,
  );

  shouldMatchSnapshot(
    'should correctly render cookie banner',
    <ServiceContextProvider service="news">
      <Banner
        type="cookie"
        onAccept={{ tap: [`parentId.accept`] }}
        onReject={{ tap: [`parentId.reject`] }}
      />
    </ServiceContextProvider>,
  );
});
