import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import Caption from './index';
import InlineLink from '../../InlineLink';

storiesOf('Caption', module)
  .add('default', () => <Caption>This is a caption.</Caption>)
  .add('containing an inline link', () => (
    <Caption>
      This is a caption{' '}
      <InlineLink href="https://www.bbc.com">
        containing an inline link
      </InlineLink>
      .
    </Caption>
  ));
