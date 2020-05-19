import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import IdxPage from '.';

storiesOf('Pages|Idx Page', module)
  .addDecorator(withKnobs)
  .add('default', () => <IdxPage />);
