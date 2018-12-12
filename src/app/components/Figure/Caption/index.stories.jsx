import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import InlineLink from '@bbc/psammead-inline-link';
import Caption from './index';

storiesOf('Caption', module)
  .add('default', () => <Caption>This is a caption.</Caption>)
  .add('containing an inline link', () => (
    <Caption>
      {'This is a caption '}
      <InlineLink href="https://www.bbc.com">
        containing an inline link
      </InlineLink>
      .
    </Caption>
  ));
