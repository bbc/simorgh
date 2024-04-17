import React from 'react';
import { storiesOf } from '@storybook/react';
import notes from '../README.md';
import ImagePlaceholderAmp from './index.amp';
import { ampDecorator } from '../../../../../../.storybook/preview';

storiesOf('Components/Images/ImagePlaceholderAmp', module)
  .addDecorator(ampDecorator)
  .add(
    'Amp Image placeholder',
    () => (
      <amp-img
        src="https://ichef.bbci.co.uk/ace/ws/800/cpsprodpb/14763/production/_112811838__112171791_nicktriggle_tr-nc.png_"
        width="645px"
        height="128px"
        layout="intrinsic"
      >
        <ImagePlaceholderAmp />
      </amp-img>
    ),
    { notes },
  )
  .add(
    'Amp Image placeholder dark mode',
    () => (
      <amp-img
        src="https://ichef.bbci.co.uk/ace/ws/800/cpsprodpb/14763/production/_112811838__112171791_nicktriggle_tr-nc.png_"
        width="645px"
        height="128px"
        layout="intrinsic"
      >
        <ImagePlaceholderAmp darkPlaceholder />
      </amp-img>
    ),
    { notes },
  );
