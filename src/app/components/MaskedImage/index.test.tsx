import {
  render,
  screen,
  act,
  waitFor,
} from '#app/components/react-testing-library-with-providers';
import MaskedImage from './index';

describe('Masked Image', () => {
  it('should render an image with the correct src', async () => {
    await act(async () => {
      render(
        <MaskedImage
          imageUrl="https://ichef.bbci.co.uk/ace/standard/480/cpsdevpb/1d5b/test/5f969ec0-c4d8-11ed-8319-9b394d8ed0dd.jpg"
          imageUrlTemplate="https://ichef.bbci.co.uk/ace/standard/{width}/cpsdevpb/1d5b/test/5f969ec0-c4d8-11ed-8319-9b394d8ed0dd.jpg"
          imageWidth={660}
        />,
      );
    });

    await waitFor(() => {
      const image = screen.getByRole('presentation');
      expect(image.getAttribute('src')).toEqual(
        'https://ichef.bbci.co.uk/ace/standard/480/cpsdevpb/1d5b/test/5f969ec0-c4d8-11ed-8319-9b394d8ed0dd.jpg',
      );
    });
  });

  it('should render an image with empty alt text', async () => {
    await act(async () => {
      render(
        <MaskedImage
          imageUrl="https://ichef.bbci.co.uk/ace/standard/480/cpsdevpb/1d5b/test/5f969ec0-c4d8-11ed-8319-9b394d8ed0dd.jpg"
          imageUrlTemplate="https://ichef.bbci.co.uk/ace/standard/{width}/cpsdevpb/1d5b/test/5f969ec0-c4d8-11ed-8319-9b394d8ed0dd.jpg"
          imageWidth={660}
        />,
      );
    });

    await waitFor(() => {
      const image = screen.getByRole('presentation');
      expect(image.getAttribute('alt')).toEqual('');
    });
  });

  it('should render an image with alt text', async () => {
    await act(async () => {
      render(
        <MaskedImage
          imageUrl="https://ichef.bbci.co.uk/ace/standard/480/cpsdevpb/1d5b/test/5f969ec0-c4d8-11ed-8319-9b394d8ed0dd.jpg"
          imageUrlTemplate="https://ichef.bbci.co.uk/ace/standard/{width}/cpsdevpb/1d5b/test/5f969ec0-c4d8-11ed-8319-9b394d8ed0dd.jpg"
          imageWidth={660}
          altText="alt text"
        />,
      );
    });

    await waitFor(() => {
      const image = screen.getByRole('img');
      expect(image.getAttribute('alt')).toEqual('alt text');
    });
  });
});
