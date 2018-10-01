import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import Paragraph from './index';

storiesOf('Paragraph', module).add('default', () => (
  <Paragraph>This is some paragraph content.</Paragraph>
));
