import { storiesOf } from '@storybook/react';
import React from 'react';
import VisuallyHiddenHeadlineContainer from '.';
import blocksSingleFragment from '../Headings/testHelpers';

const headline = blocksSingleFragment('This is a headline.', []);

storiesOf('Containers|VisuallyHiddenHeadline', module)
  .addParameters({ chromatic: { disable: true } })
  .add('default VisuallyHiddenHeadline', () => (
    <VisuallyHiddenHeadlineContainer
      type="visuallyHiddenHeadline"
      blocks={headline}
    />
  ));
