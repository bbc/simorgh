import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import React from 'react';
import HeadingsContainer from '.';
import blocksSingleFragment from './testHelpers';

const headline = blocksSingleFragment('This is a headline.', []);

const subheadline = blocksSingleFragment('This is a subheadline.', []);

storiesOf('Heading Container')
  .add('default heading', () => (
    <HeadingsContainer blocks={headline} type="headline" />
  ))
  .add('default subheading', () => (
    <HeadingsContainer blocks={subheadline} type="subheadline" />
  ));
