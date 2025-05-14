import React, { act, RefObject } from 'react';
import {
  screen,
  render,
  fireEvent,
} from '#app/components/react-testing-library-with-providers';
import NavigationButtons from '.';
import { PROMO_ITEM_WIDTH } from '../index.styles';

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
      scrollWidth: PROMO_ITEM_WIDTH * itemCount,
      clientWidth: PROMO_ITEM_WIDTH * paneWidth,
      scrollBy: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    },
  } as unknown as RefObject<HTMLDivElement>;

  (mockHTMLElementRef.current.scrollBy as jest.Mock).mockImplementation(
    ({ left }) => {
      mockHTMLElementRef.current.scrollLeft += left;
    },
  );

  return mockHTMLElementRef;
};

describe('PortraitCarouselNavigation', () => {
  it(`Should scroll items by ${PROMO_ITEM_WIDTH}px when the right button is clicked`, async () => {
    const mockRef = createMockScrollElementRef({
      startScrollPosition: 0,
      itemCount: 3,
      paneWidth: 1,
    });

    await act(async () => {
      render(<NavigationButtons scrollPaneRef={mockRef} />);
    });

    const rightButton = screen.getByTestId('pv-right-nav-button');

    await act(async () => {
      fireEvent.click(rightButton);
      fireEvent.click(rightButton);
      jest.runAllTimers();
    });

    expect(mockRef.current.scrollLeft).toBe(PROMO_ITEM_WIDTH * 2);
  });

  it(`Should scroll items by negative ${PROMO_ITEM_WIDTH}px when the left button is clicked`, async () => {
    const mockRef = createMockScrollElementRef({
      startScrollPosition: PROMO_ITEM_WIDTH * 2,
      itemCount: 3,
      paneWidth: 1,
    });

    await act(async () => {
      render(<NavigationButtons scrollPaneRef={mockRef} />);
    });

    const leftButton = screen.getByTestId('pv-left-nav-button');

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
      render(<NavigationButtons scrollPaneRef={mockRef} />);
    });

    const leftButton = screen.getByTestId('pv-left-nav-button');

    fireEvent.click(leftButton);
    jest.runAllTimers();

    await act(async () => {
      fireEvent.click(leftButton);
      jest.runAllTimers();
    });

    expect(mockRef.current.scrollLeft).toBe(0);
    expect(leftButton).toBeDisabled();
  });

  it('Should disable right button when the scroll pane is at the end', async () => {
    const mockRef = createMockScrollElementRef({
      startScrollPosition: 0,
      itemCount: 3,
      paneWidth: 1,
    });

    await act(async () => {
      render(<NavigationButtons scrollPaneRef={mockRef} />);
    });

    const rightButton = screen.getByTestId('pv-right-nav-button');

    await act(async () => {
      fireEvent.click(rightButton);
      fireEvent.click(rightButton);
      fireEvent.click(rightButton);
      jest.runAllTimers();
    });

    expect(mockRef.current.scrollLeft).toBe(PROMO_ITEM_WIDTH * 3);
    expect(rightButton).toBeDisabled();
  });
});
