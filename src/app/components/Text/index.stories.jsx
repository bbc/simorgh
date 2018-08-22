import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import Text from './index';

storiesOf('Text', module)
  .add('default', () => <Text text="This is text with no formatting." />)
  .add('bold', () => (
    <Text text="This is text with **some bold formatting**." />
  ))
  .add('italic', () => (
    <Text text="This is text with _some italic formatting_." />
  ))
  .add('strike-through', () => (
    <Text text="This is text with ~~some strike-through formatting~~." />
  ))
  .add('inline code', () => (
    <Text text="This is text with `some inline code`." />
  ))
  .add('inline link', () => (
    <Text text="This is text that contains an [inline link](https://www.bbc.com/news) inside it." />
  ));
