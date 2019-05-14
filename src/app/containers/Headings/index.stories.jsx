import { storiesOf } from '@storybook/react';
import React from 'react';
import HeadingsContainer from '.';
import articleData from '../../../../data/test/news/articles/c0000000007o.json';



storiesOf('Heading Container')
  .add('default heading', () => (
    <HeadingsContainer blocks={} type='headline' />
  ))
  .add('default subheading', () => {
    <HeadingsContainer blocks={} type='subheadline' />
  });
