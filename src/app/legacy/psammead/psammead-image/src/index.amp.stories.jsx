import AmpImg from './index.amp';
import { stories } from './testHelpers/stories';
import { ampDecorator } from '#storybook/preview';

const additionalProps = {
  layout: 'responsive',
};

stories({
  Component: AmpImg,
  title: 'Components/Images/Image - AmpImg',
  includeHeight: true,
  additionalProps,
  styleDecorator: ampDecorator,
});
