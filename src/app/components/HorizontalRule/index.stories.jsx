import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import HorizontalRule from './index';
import Paragraph from '../Paragraph';

storiesOf('HorizontalRule', module)
  .add('default', () => <HorizontalRule />)
  .add('between paragraphs', () => (
    <React.Fragment>
      <Paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc cursus
        velit vitae interdum euismod. Donec venenatis massa sit amet bibendum
        accumsan. Mauris hendrerit ullamcorper tortor, vitae vestibulum ipsum
        vehicula nec. Sed consequat sapien urna, ut porttitor magna condimentum
        sit amet. Phasellus ullamcorper, lorem non dictum convallis, justo elit
        pharetra est, sed volutpat justo orci sit amet quam. Nam a mollis ante.
      </Paragraph>
      <HorizontalRule />
      <Paragraph>
        Aenean sed dictum ex. Etiam varius tellus neque, id interdum turpis
        tempus quis. Aenean in eros ut est sagittis rhoncus ac id metus.
        Maecenas faucibus urna urna, in placerat nisi accumsan non. Maecenas et
        auctor sem, non dignissim justo. Quisque nisl mi, malesuada vitae leo
        vitae, sagittis vulputate urna.
      </Paragraph>
    </React.Fragment>
  ));
