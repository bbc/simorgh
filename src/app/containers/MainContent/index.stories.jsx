import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import MainContentContainer from './index';
import { mainContentBlock } from '../../models/blocks';

storiesOf('MainContent', module)
  .add('with just a headline', () => {
    const blocksOnlyHeadline = mainContentBlock.filter(
      ({ type }) => type === 'headline',
    );

    return <MainContentContainer blocks={blocksOnlyHeadline} />;
  })
  .add('with a headline and other blocks', () => (
    <MainContentContainer blocks={mainContentBlock} />
  ));
