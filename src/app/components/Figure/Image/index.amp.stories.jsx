import AmpImg from './index.amp';
import stories from './testHelpers/stories';

const additionalProps = {
  layout: 'responsive',
};

stories(AmpImg, 'Image - AmpImg', additionalProps);
