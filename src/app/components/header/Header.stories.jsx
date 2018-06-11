import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import Header from './header/Header';

storiesOf('Header', module).add('default', () => <Header />);