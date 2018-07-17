import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import VideoContainer from './index';
import {
  videoBlock,
  rawImageModel,
  rawVideoModel,
  rawVideoBlock,
  rawImageBlock,
  imageBlock,
} from '../../models/blocks';

const rVB = rawVideoBlock(
  rawVideoModel('urn:bbc:pips:pid:p064nsyw', 'p064nsz3', 'clip', 299),
);
const rIB = rawImageBlock(
  rawImageModel('/cpsprodpb/5BD5/production/_101690532_2.jpg'),
);
const img1 = imageBlock(rIB);

const data = videoBlock(rVB, img1);

storiesOf('Video Container', module).add('default', () => (
  <VideoContainer {...data} />
));
