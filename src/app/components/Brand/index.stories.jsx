import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import Brand from './index';

storiesOf('Brand', module).add('default - indented logo', () => <Brand />);
storiesOf('Brand', module).add('logo is not indented', () => (
  <Brand indentedLogo={false} />
));
