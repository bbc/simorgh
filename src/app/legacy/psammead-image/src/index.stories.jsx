import { withKnobs } from '@storybook/addon-knobs';
import { Img } from '.';
import { stories } from './testHelpers/stories';

const type = 'Img';

stories({
  Component: Img,
  title: 'Components/Images/Image - Img',
  includeHeight: false,
  additionalProps: {},
  styleDecorator: withKnobs,
  type,
  isCanonical: true,
});
