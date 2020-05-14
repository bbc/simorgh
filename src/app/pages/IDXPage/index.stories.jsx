import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import IDXPage from '.';

storiesOf('Pages|IDX Page', module)
  .addDecorator(withKnobs)
  .add('default', () => <IDXPage />);
