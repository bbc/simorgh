import { Helmet } from 'react-helmet';
import {
  act,
  render,
} from '#app/components/react-testing-library-with-providers';
import {
  ARTICLE_PAGE,
  AUDIO_PAGE,
  LIVE_RADIO_PAGE,
  TV_PAGE,
} from '#app/routes/utils/pageTypes';
import Metadata from '.';
import { aresMediaBlocks } from '../fixture';
import { MediaBlock } from '../types';

describe('Media Loader - Metadata', () => {
  const embedSource =
    'https://www.test.bbc.com/ws/av-embeds/articles/c3wmq4d1y3wo/p01k6mtv/en-GB';

  it('should not render Metadata when aresMedia has no metadata block ', async () => {
    let container;

    await act(async () => {
      ({ container } = render(<Metadata blocks={[]} embedURL={embedSource} />, {
        pageType: ARTICLE_PAGE,
      }));
    });

    expect(container).toBeEmptyDOMElement();
  });

  it('should render Metadata correctly when aresMedia has a metadata block', async () => {
    await act(async () => {
      render(
        <Metadata
          blocks={aresMediaBlocks as MediaBlock[]}
          embedURL={embedSource}
        />,
        {
          pageType: ARTICLE_PAGE,
        },
      );
    });

    const container = Helmet.peek();
    expect(container).toMatchSnapshot();
  });

  it('should omit embedURL from the linked data when no embedURL is provided', async () => {
    await act(async () => {
      render(<Metadata blocks={aresMediaBlocks as MediaBlock[]} />, {
        pageType: ARTICLE_PAGE,
      });
    });

    const { scriptTags } = Helmet.peek();
    const linkedData = JSON.parse(scriptTags[0].innerHTML);

    expect(linkedData).not.toHaveProperty('embedURL');
    expect(linkedData).toHaveProperty(
      'name',
      'Five things ants can teach us about management',
    );
  });

  it.each([AUDIO_PAGE, TV_PAGE, LIVE_RADIO_PAGE])(
    'should not render metadata component as the %s page type is not supported',
    async pageType => {
      let container;

      await act(async () => {
        ({ container } = render(<Metadata blocks={[]} />, {
          pageType,
        }));
      });

      expect(container).toBeEmptyDOMElement();
    },
  );
});
