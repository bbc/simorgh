import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import IdxPageWithContext from './testHelpers';
import { getLocalMostReadEndpoint } from '#lib/utilities/getMostReadUrls';

storiesOf('Pages|Idx Page', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <IdxPageWithContext
      mostReadEndpointOverride={getLocalMostReadEndpoint({
        service: 'persian',
        variant: 'default',
      })}
    />
  ));
