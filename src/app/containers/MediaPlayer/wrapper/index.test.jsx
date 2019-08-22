import React from 'react';
import { shouldMatchSnapshot } from '../../../../testHelpers';
import MediaPlayerWrapper from '.';

describe('Media Player: Wrapper', () => {
  shouldMatchSnapshot(
    'should render a placeholder when prop is set to `true`',
    <MediaPlayerWrapper
      showPlaceholder
      placeholderSrc="http://foo.bar/placeholder.png"
    >
      <>Foo bar</>
    </MediaPlayerWrapper>,
  );

  shouldMatchSnapshot(
    'should render component children when placeholder prop is `false`',
    <MediaPlayerWrapper placeholderSrc="foo.bar" showPlaceholder={false}>
      <>Foo bar</>
    </MediaPlayerWrapper>,
  );
});
