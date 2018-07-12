import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import Markdown from './index';

storiesOf('Markdown', module)
  .add('default', () => <Markdown text="This is text with no formatting." />)
  .add('bold', () => (
    <Markdown text="This is text with **some bold formatting**." />
  ))
  .add('italic', () => (
    <Markdown text="This is text with __some italic formatting__." />
  ))
  .add('strike-through', () => (
    <Markdown text="This is text with ~~some strike-through formatting~~." />
  ))
  .add('inline code', () => (
    <Markdown text="This is text with `some inline code`." />
  ));
