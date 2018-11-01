import React from 'react';
import { shouldMatchSnapshot } from '../../helpers/tests/testHelpers';
import { PlatformContextProvider, PlatformContextConsumer } from './index';

describe('PlatformContext', () => {
  const testBrandNameWithServiceContext = platform => {
    shouldMatchSnapshot(
      `should forward the ${platform} type`,
      <PlatformContextProvider platform={platform}>
        <PlatformContextConsumer>
          {props => <span>{props.platform}</span>}
        </PlatformContextConsumer>
      </PlatformContextProvider>,
    );
  };

  testBrandNameWithServiceContext('canonical');
  testBrandNameWithServiceContext('amp');
});
