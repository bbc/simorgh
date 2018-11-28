import React from 'react';
import { shouldMatchSnapshot } from '../../helpers/tests/testHelpers';
import { PlatformContextProvider, PlatformContextConsumer } from './index';

describe('PlatformContext', () => {
  const testPlatformStringWithPlatformContext = platformString => {
    shouldMatchSnapshot(
      `should have a platform string for ${platformString}`,
      <PlatformContextProvider platform={platformString}>
        <PlatformContextConsumer>
          {platform => <span>{platform}</span>}
        </PlatformContextConsumer>
      </PlatformContextProvider>,
    );
  };

  testPlatformStringWithPlatformContext('default');
  testPlatformStringWithPlatformContext('canonical');
  testPlatformStringWithPlatformContext('amp');
});
