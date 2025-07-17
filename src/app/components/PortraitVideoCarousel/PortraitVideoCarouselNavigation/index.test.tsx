import { RefObject } from 'react';
import {
  act,
  screen,
  render,
  fireEvent,
} from '#app/components/react-testing-library-with-providers';
import PortraitCarouselNavigation from '.';
import { PROMO_ITEM_WIDTH_MIN } from '../utils/styleUtils';

jest.useFakeTimers();

const createMockScrollElementRef = ({
  startScrollPosition,
  itemCount,
  paneWidth,
}: {
  startScrollPosition: number;
  itemCount: number;
  paneWidth: number;
}) => {
  const mockHTMLElementRef = {
    current: {
      scrollLeft: startScrollPosition,
      scrollWidth: PROMO_ITEM_WIDTH_MIN * itemCount,
      clientWidth: PROMO_ITEM_WIDTH_MIN * paneWidth,
      scrollBy: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    },
  } as unknown as RefObject<HTMLUListElement>;

  (mockHTMLElementRef.current.scrollBy as jest.Mock).mockImplementation(
    ({ left }) => {
      mockHTMLElementRef.current.scrollLeft += left;
    },
  );

  return mockHTMLElementRef;
};

describe('PortraitCarouselNavigation', () => {
  it(`Should scroll items by ${PROMO_ITEM_WIDTH_MIN}px when the right button is clicked`, async () => {
    const mockRef = createMockScrollElementRef({
      startScrollPosition: 0,
      itemCount: 3,
      paneWidth: 1,
    });

    await act(async () => {
      render(<PortraitCarouselNavigation scrollPaneRef={mockRef} />);
    });

    const rightButton = screen.getByTestId('pv-scroll-right');

    await act(async () => {
      fireEvent.click(rightButton);
      fireEvent.click(rightButton);
      jest.runAllTimers();
    });

    expect(mockRef.current.scrollLeft).toBe(PROMO_ITEM_WIDTH_MIN * 2);
  });

  it(`Should scroll items by negative ${PROMO_ITEM_WIDTH_MIN}px when the left button is clicked`, async () => {
    const mockRef = createMockScrollElementRef({
      startScrollPosition: PROMO_ITEM_WIDTH_MIN * 2,
      itemCount: 3,
      paneWidth: 1,
    });

    await act(async () => {
      render(<PortraitCarouselNavigation scrollPaneRef={mockRef} />);
    });

    const leftButton = screen.getByTestId('pv-scroll-left');

    await act(async () => {
      fireEvent.click(leftButton);
      fireEvent.click(leftButton);
      jest.runAllTimers();
    });

    expect(mockRef.current.scrollLeft).toBe(0);
  });

  it('Should disable left button when the scroll pane is at the beginning', async () => {
    const mockRef = createMockScrollElementRef({
      startScrollPosition: 0,
      itemCount: 2,
      paneWidth: 1,
    });

    await act(async () => {
      render(<PortraitCarouselNavigation scrollPaneRef={mockRef} />);
    });

    const leftButton = screen.getByTestId('pv-scroll-left');
    const rightButton = screen.getByTestId('pv-scroll-right');

    await act(async () => {
      fireEvent.click(leftButton);
      jest.runAllTimers();
    });

    expect(mockRef.current.scrollLeft).toBe(0);
    expect(leftButton).toBeDisabled();
    expect(rightButton).not.toBeDisabled();
  });

  it('Should disable right button when the scroll pane is at the end', async () => {
    const mockRef = createMockScrollElementRef({
      startScrollPosition: 0,
      itemCount: 3,
      paneWidth: 1,
    });

    await act(async () => {
      render(<PortraitCarouselNavigation scrollPaneRef={mockRef} />);
    });

    const rightButton = screen.getByTestId('pv-scroll-right');
    const leftButton = screen.getByTestId('pv-scroll-left');

    await act(async () => {
      fireEvent.click(rightButton);
      fireEvent.click(rightButton);
      fireEvent.click(rightButton);
      jest.runAllTimers();
    });

    expect(mockRef.current.scrollLeft).toBe(PROMO_ITEM_WIDTH_MIN * 3);
    expect(rightButton).toBeDisabled();
    expect(leftButton).not.toBeDisabled();
  });

  it('Should enable both left and right buttons when scrolled mid way', async () => {
    const mockRef = createMockScrollElementRef({
      startScrollPosition: PROMO_ITEM_WIDTH_MIN,
      itemCount: 4,
      paneWidth: 1,
    });

    await act(async () => {
      render(<PortraitCarouselNavigation scrollPaneRef={mockRef} />);
    });

    const leftButton = screen.getByTestId('pv-scroll-left');
    const rightButton = screen.getByTestId('pv-scroll-right');

    expect(leftButton).not.toBeDisabled();
    expect(rightButton).not.toBeDisabled();
  });
});
