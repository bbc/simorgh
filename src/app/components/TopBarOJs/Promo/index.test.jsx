import { render } from '../../react-testing-library-with-providers';
import {
  topStoriesBlocks,
  topStoriesBlocksWithLiveItem,
} from '../helpers/fixtureData';
import TopBarOJs from '..';

describe('Top Bar Onward Journey Promo', () => {
  it('should display Top Stories content', () => {
    const { container } = render(<TopBarOJs blocks={[topStoriesBlocks[0]]} />);
    const expectedHeadline =
      topStoriesBlocks[0].headlines.promoHeadline.blocks[0].model.blocks[0]
        .model.text;
    expect(container).toHaveTextContent(expectedHeadline);
  });

  it('should render a link on Top Stories article headline', () => {
    const { queryByRole } = render(
      <TopBarOJs blocks={[topStoriesBlocks[2]]} />,
    );
    expect(queryByRole('link')).toBeInTheDocument();
  });

  it('should not display a timestamp on TopBar component', () => {
    const { queryByTestId } = render(
      <TopBarOJs blocks={[topStoriesBlocks[0]]} />,
    );
    expect(queryByTestId('timestamp')).not.toBeInTheDocument();
  });

  it('should display a LiveLabel when returning Top Stories', () => {
    const { container } = render(
      <TopBarOJs blocks={[topStoriesBlocksWithLiveItem[1]]} />,
    );
    expect(
      container.querySelector('[class*="liveLabelPulse"]'),
    ).toBeInTheDocument();
    expect(
      container.querySelector('[class*="liveLabelText"]'),
    ).toBeInTheDocument();
  });
});
