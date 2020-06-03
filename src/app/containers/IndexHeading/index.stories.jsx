import React from 'react';
import { storiesOf } from '@storybook/react';
import { cyrillicAndLatin } from '@bbc/gel-foundations/scripts';
import IndexHeadingContainer from '.';

storiesOf('Containers|Index Heading', module)
  .addParameters({ chromatic: { disable: true } })
  .add('default', () => (
    <IndexHeadingContainer script={cyrillicAndLatin} service="ukrainian">
      Index Heading
    </IndexHeadingContainer>
  ));
