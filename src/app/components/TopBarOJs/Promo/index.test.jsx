import React from 'react';
import { render } from '../../react-testing-library-with-providers';
import {
  PromoSingleBlock,
  oneLinkWithTimestamp,
  topStoriesBlocks,
  topStoriesBlocksWithLiveItem,
} from '../helpers/fixtureData';
import Promo from '.';
import { ServiceContextProvider } from '../../../contexts/ServiceContext';
import TopBarOJs from '..';

const ScrollablePromo = ({ block, experimentVariant }) => (
  <ServiceContextProvider service="pidgin">
    <Promo
      block={block}
      onClick={() => {}}
      experimentVariant={experimentVariant}
    />
  </ServiceContextProvider>
);

describe('ScrollablePromo', () => {
  it('should render a link', () => {
    const { queryByRole } = render(
      <ScrollablePromo block={PromoSingleBlock} />,
    );
    expect(queryByRole('link')).toBeInTheDocument();
  });

  it('should extract and render the correct title', () => {
    const { getByText } = render(<ScrollablePromo block={PromoSingleBlock} />);
    expect(
      getByText(
        'This is a very long headline. I am creating this for a test purpose. I love creating these type of tests. I really do not know what to write.',
      ),
    ).toBeTruthy();
  });

  it('should extract and render the correct href', () => {
    const { queryByRole } = render(
      <ScrollablePromo block={PromoSingleBlock} />,
    );
    expect(queryByRole('link').href).toEqual('https://www.bbc.com/mundo');
  });

  it('should render timestamp if timestamp is available', () => {
    const { container } = render(
      <ScrollablePromo block={oneLinkWithTimestamp[0]} />,
    );
    expect(container.getElementsByTagName('time')[0]).toBeInTheDocument();
  });

  describe('OJ Top Bar Promo', () => {
    it('should display Top Stories content', () => {
      const { container } = render(<TopBarOJs block={topStoriesBlocks[0]} />);
      const expectedHeadline =
        topStoriesBlocks[0].headlines.promoHeadline.blocks[0].model.blocks[0]
          .model.text;
      expect(container).toHaveTextContent(expectedHeadline);
    });

    it('should render a link on Top Stories article headline', () => {
      const { queryByRole } = render(<TopBarOJs block={topStoriesBlocks[2]} />);
      expect(queryByRole('link')).toBeInTheDocument();
    });

    it('should not display a timestamp on TopBar component', () => {
      const { queryByTestId } = render(
        <TopBarOJs block={topStoriesBlocks[0]} />,
      );
      expect(queryByTestId('timestamp')).not.toBeInTheDocument();
    });

    it('should display a LiveLabel when returning Top Stories', () => {
      const { container } = render(
        <TopBarOJs block={topStoriesBlocksWithLiveItem[1]} />,
      );
      expect(
        container.querySelector('[class*="liveLabelPulse"]'),
      ).toBeInTheDocument();
      expect(
        container.querySelector('[class*="liveLabelText"]'),
      ).toBeInTheDocument();
    });
  });
});
