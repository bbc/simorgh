import React from 'react';
import { storiesOf } from '@storybook/react';
import { cyrillicAndLatin } from '@bbc/gel-foundations/scripts';
import IndexHeading from '.';

storiesOf('Containers|Index Heading', module)
  .addParameters({ chromatic: { disable: true } })
  .add('default', () => (
    <IndexHeading script={cyrillicAndLatin} service="ukrainian">
      Index Heading
    </IndexHeading>
  ));
