import InPictureVideo from '.'
import readme from './README.md'
import metadata from './metadata.json'

const Component = () => (
  <InPictureVideo />
);

export const Example = () => (
  <Component />
);

export default {
  title: 'Components/InPictureVideo',
  Component,
   parameters: {
    docs: { 
      readme,
      metadata,
    },
  },
};
