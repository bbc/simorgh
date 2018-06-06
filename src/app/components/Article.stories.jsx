import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import Article from './Article';

storiesOf('Article', module).add('default', () => <Article />);
