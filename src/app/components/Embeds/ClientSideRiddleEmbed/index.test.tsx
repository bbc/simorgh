import { render } from '#app/components/react-testing-library-with-providers';
import ClientSideRiddleEmbed from '.';
import vivoRiddleEmbedData from './fixtures';

describe('ClientSideRiddleEmbed', () => {
  it('should return a valid iframe for blocks with a valid url', () => {
    const { riddleId } = vivoRiddleEmbedData.oembed;
    const { container } = render(
      <ClientSideRiddleEmbed {...vivoRiddleEmbedData} />,
    );

    const iFrame = container.querySelector(
      `div[data-rid-id=${riddleId}]`,
    )?.innerHTML;

    expect(iFrame).toBe(
      `<iframe title="Interactive or visual content" src="https://www.riddle.com/embed/a/JmrmjKha?lazyImages=false&amp;staticHeight=false" allow="autoplay" referrerpolicy="strict-origin"></iframe>`,
    );
  });

  it('should return null for blocks with no url', () => {
    const sampleInvalidBlock = {
      oembed: {
        ...vivoRiddleEmbedData.oembed,
        url: undefined,
      },
    };
    const { container } = render(
      <ClientSideRiddleEmbed {...sampleInvalidBlock} />,
    );
    expect(container.innerHTML).toBe('');
  });
});
