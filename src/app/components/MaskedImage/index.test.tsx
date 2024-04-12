import React from 'react';
import {
  render,
  act,
  waitFor,
} from '#app/components/react-testing-library-with-providers';
import MaskedImage from './index';

describe('Masked Image', () => {
  it('should render if a header image with the correct src', async () => {
    const { container } = await act(async () => {
      return render(
        <MaskedImage
          imageUrl="https://ichef.bbci.co.uk/ace/standard/480/cpsdevpb/1d5b/test/5f969ec0-c4d8-11ed-8319-9b394d8ed0dd.jpg"
          imageUrlTemplate="https://ichef.bbci.co.uk/ace/standard/{width}/cpsdevpb/1d5b/test/5f969ec0-c4d8-11ed-8319-9b394d8ed0dd.jpg"
          imageWidth={660}
        />,
      );
    });

    await waitFor(() => {
      const headerImage = container.querySelector('img');
      expect(headerImage?.getAttribute('src')).toEqual(
        'https://ichef.bbci.co.uk/ace/standard/480/cpsdevpb/1d5b/test/5f969ec0-c4d8-11ed-8319-9b394d8ed0dd.jpg',
      );
    });
  });

  it('should render if a header image with an empty alt text', async () => {
    const { container } = await act(async () => {
      return render(
        <MaskedImage
          imageUrl="https://ichef.bbci.co.uk/ace/standard/480/cpsdevpb/1d5b/test/5f969ec0-c4d8-11ed-8319-9b394d8ed0dd.jpg"
          imageUrlTemplate="https://ichef.bbci.co.uk/ace/standard/{width}/cpsdevpb/1d5b/test/5f969ec0-c4d8-11ed-8319-9b394d8ed0dd.jpg"
          imageWidth={660}
        />,
      );
    });

    await waitFor(() => {
      const headerImage = container.querySelector('img');
      expect(headerImage?.getAttribute('alt')).toEqual('');
    });
  });
});
