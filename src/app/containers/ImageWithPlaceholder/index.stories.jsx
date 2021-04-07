import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  ImageWithPlaceholder,
  AmpImageWithPlaceholder,
  LazyLoadImageWithPlaceholder,
} from './fixtureData';
import AmpDecorator from '../../../../.storybook/helpers/ampDecorator';

storiesOf('Containers/Image with Placeholder/Canonical', module)
  .addParameters({ chromatic: { disable: true } })
  .add('default', () => <ImageWithPlaceholder />)
  .add('with a lazyloaded image', () => <LazyLoadImageWithPlaceholder />);

storiesOf('Containers/Image with Placeholder/AMP', module)
  .addParameters({ chromatic: { disable: true } })
  .addDecorator(AmpDecorator)
  .add('default', () => <AmpImageWithPlaceholder />);
