import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import IDXPageWithContext from './testHelpers';
import { getLocalMostReadEndpoint } from '#lib/utilities/getMostReadUrls';

storiesOf('Pages|Idx Page', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <IDXPageWithContext
      mostReadEndpointOverride={getLocalMostReadEndpoint({
        service: 'persian',
        variant: 'default',
      })}
    />
  ));
