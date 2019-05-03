import React from 'react';
import { shouldShallowMatchSnapshot } from '../../helpers/tests/testHelpers';
import StoryPromoFigure from './Figure';

describe('StoryPromo Figure Container', () => {
  shouldShallowMatchSnapshot(
    'should render correctly',
    <StoryPromoFigure
      path="/foobar.png"
      altText="Alt text for an image"
      height={120}
      width={340}
    />,
  );

  shouldShallowMatchSnapshot(
    'should render null when no props provided',
    <StoryPromoFigure />,
  );

  shouldShallowMatchSnapshot(
    'should null when some props are missing',
    <StoryPromoFigure path="/foobar.png" height={120} width={340} />,
  );
});
