import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import React from 'react';
import HeadingsContainer from '.';
import articleData from '../../../../data/test/news/articles/c0000000007o.json';

const articleBlocks = articleData.content;

storiesOf('Heading Container')
  .add('default heading', () => (
    <HeadingsContainer blocks={articleBlocks} type="headline" />
  ))
  .add('default subheading', () => (
    <HeadingsContainer blocks={articleBlocks} type="subheadline" />
  ));
