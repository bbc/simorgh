import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import MainContent from './index';
import { Headline } from '../Headings';
import Text from '../Text';

storiesOf('MainContent', module).add('default', () => (
  <MainContent>
    <Headline>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </Headline>
    <Text
      text="Aenean accumsan lorem ac tincidunt sollicitudin. Curabitur sem lectus,
      volutpat ultricies diam nec, ornare tempor est. Maecenas porttitor sapien
      eu ullamcorper vestibulum. Donec elementum urna vel imperdiet egestas.
      Maecenas sagittis laoreet massa."
    />
    <Text
      text="Sed massa ipsum, commodo ac posuere nec, pharetra vitae tellus. In ligula
      purus, suscipit a lacinia vel, varius in tortor. Ut auctor molestie justo
      ut lacinia. Etiam aliquet, eros a fringilla molestie, odio lorem suscipit
      felis, a consectetur ipsum nulla nec nibh."
    />
    <Text
      text="Nam placerat eros ac dignissim porttitor. Quisque a ex nec nulla luctus
      vestibulum id eget mi."
    />
    <Text
      text="Phasellus tincidunt turpis vel ultrices sodales. Mauris congue justo at
      orci dictum sollicitudin a non nisi. Pellentesque malesuada efficitur nisi
      et aliquet."
    />
  </MainContent>
));
