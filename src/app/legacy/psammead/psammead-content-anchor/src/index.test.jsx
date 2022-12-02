/* eslint-disable no-underscore-dangle */

import React from 'react';
import { render, act } from '@testing-library/react';
import styled from '@emotion/styled';
import ContentAnchor from '.';

let IOInstance;
let ROInstance;

beforeEach(() => {
  IOInstance = null;
  ROInstance = null;

  delete global.CSS; // delete our mocked CSS.supports API so the scroll adjustment logic is the default behaviour

  global.IntersectionObserver = callback => {
    // return a mock instance and store it globally so we can fire the callback to simulate an intersection event
    IOInstance = {
      observe: jest.fn(),
      disconnect: jest.fn(),
      fireIntersectEvent: callback,
    };
    return IOInstance;
  };

  global.ResizeObserver = callback => {
    // return a mock instance and store it globally so we can fire the callback to simulate a resize event
    ROInstance = {
      observe: jest.fn(),
      disconnect: jest.fn(),
      fireResizeEvent: callback,
    };
    return ROInstance;
  };

  // mock scrollHeight - not supported in jsdom
  Object.defineProperty(HTMLElement.prototype, 'scrollHeight', {
    configurable: true,
    get() {
      return this._scrollHeight;
    },
    set(val) {
      this._scrollHeight = val;
    },
  });

  global.pageYOffset = 300; // set the scroll Y position to an arbitrary number (slightly scrolled down)

  document.body.scrollHeight = 5000; // set the default height of the document
});

afterEach(jest.clearAllMocks);

global.scrollTo = jest.fn((x, y) => {
  global.pageYOffset = y;
});

const Content = styled.div`
  height: 100px;
  width: 100px;
`;

it('should render children', () => {
  const { getByText } = render(
    <ContentAnchor>
      <Content>Test content</Content>
    </ContentAnchor>,
  );

  expect(getByText('Test content')).toBeTruthy();
});

it('should set the initial size', () => {
  const size = 500;

  const { container } = render(
    <ContentAnchor initialWidth={size} initialHeight={size}>
      <Content />
    </ContentAnchor>,
  );

  expect(
    getComputedStyle(container.firstChild).getPropertyValue('width'),
  ).toEqual(`${size}px`);

  expect(
    getComputedStyle(container.firstChild).getPropertyValue('height'),
  ).toEqual(`${size}px`);
});

it('should accept string measurements', () => {
  const stringSize = '10em';
  const { container } = render(
    <ContentAnchor initialWidth={stringSize} initialHeight={stringSize}>
      <Content />
    </ContentAnchor>,
  );

  expect(
    getComputedStyle(container.firstChild).getPropertyValue('width'),
  ).toEqual(stringSize);

  expect(
    getComputedStyle(container.firstChild).getPropertyValue('height'),
  ).toEqual(stringSize);
});

it('should not resize when in view', () => {
  const initialSize = 100;
  const sizeIncrease = 100;
  const { container } = render(
    <ContentAnchor initialWidth={initialSize} initialHeight={initialSize}>
      <Content />
    </ContentAnchor>,
  );

  act(() => {
    IOInstance.fireIntersectEvent([
      {
        isIntersecting: true, // is in view
        boundingClientRect: {
          height: initialSize,
          width: initialSize,
        },
      },
    ]);
    ROInstance.fireResizeEvent([
      {
        contentRect: {
          height: initialSize + sizeIncrease, // becomes 100px larger
          width: initialSize + sizeIncrease, // becomes 100px larger
        },
      },
    ]);
  });

  // check the wrapper did not resize
  expect(
    getComputedStyle(container.firstChild).getPropertyValue('width'),
  ).toEqual(`${initialSize}px`);
  expect(
    getComputedStyle(container.firstChild).getPropertyValue('height'),
  ).toEqual(`${initialSize}px`);
});

it('should resize when not in view', () => {
  const initialSize = 100;
  const sizeIncrease = 100;

  const { container } = render(
    <ContentAnchor initialWidth={initialSize} initialHeight={initialSize}>
      <Content />
    </ContentAnchor>,
  );

  act(() => {
    // simulate off screen and resize events
    IOInstance.fireIntersectEvent([
      {
        isIntersecting: false, // is not in view
        boundingClientRect: {
          top: -9999, // is above viewport
          height: initialSize,
          width: initialSize,
        },
      },
    ]);
    ROInstance.fireResizeEvent([
      {
        contentRect: {
          height: initialSize + sizeIncrease, // becomes 100px larger
          width: initialSize + sizeIncrease, // becomes 100px larger
        },
      },
    ]);
  });

  // check the wrapper resized
  expect(
    getComputedStyle(container.firstChild).getPropertyValue('width'),
  ).toEqual(`${initialSize + sizeIncrease}px`);
  expect(
    getComputedStyle(container.firstChild).getPropertyValue('height'),
  ).toEqual(`${initialSize + sizeIncrease}px`);
});

it('should not adjust scroll position when content is below viewport', () => {
  const initialScrollYPosition = 300;
  const initialSize = 200;
  const sizeDecrease = 100;
  const initialPagelHeight = 5000;
  const pageHeightDecreaseAmount = sizeDecrease;

  global.pageYOffset = initialScrollYPosition;

  // simulate the document becoming smaller with each call to document.body.scrollHeight
  const mockScrollHeight = jest
    .fn()
    .mockReturnValueOnce(initialPagelHeight) // 1st call to document.body.scrollHeight
    .mockReturnValueOnce(initialPagelHeight - pageHeightDecreaseAmount); // 2nd call to document.body.scrollHeight

  Object.defineProperty(HTMLElement.prototype, 'scrollHeight', {
    configurable: true,
    get() {
      return mockScrollHeight();
    },
  });

  render(
    <ContentAnchor initialWidth={initialSize} initialHeight={initialSize}>
      <Content />
    </ContentAnchor>,
  );

  act(() => {
    // simulate below viewport and resize events
    IOInstance.fireIntersectEvent([
      {
        isIntersecting: false, // is not in view
        boundingClientRect: {
          top: 9999, // is below viewport
          height: initialSize,
          width: initialSize,
        },
      },
    ]);
    ROInstance.fireResizeEvent([
      {
        contentRect: {
          height: initialSize - sizeDecrease, // becomes 100px smaller
          width: initialSize - sizeDecrease, // becomes 100px smaller
        },
      },
    ]);
  });

  expect(global.scrollTo).not.toHaveBeenCalledWith();
  expect(global.pageYOffset).toEqual(initialScrollYPosition);
});

it('should adjust Y scroll position when above viewport and child content becomes smaller', () => {
  const initialScrollYPosition = 1000;
  const expectedXPos = 0;
  const expectedYPos = 900;
  const initialSize = 200;
  const sizeDecrease = 100;
  const initialPagelHeight = 5000;
  const pageHeightDecreaseAmount = sizeDecrease;

  global.pageYOffset = initialScrollYPosition;

  // simulate the document becoming smaller with each call to document.body.scrollHeight
  const mockScrollHeight = jest
    .fn()
    .mockReturnValueOnce(initialPagelHeight) // 1st call to document.body.scrollHeight
    .mockReturnValueOnce(initialPagelHeight - pageHeightDecreaseAmount); // 2nd call to document.body.scrollHeight

  Object.defineProperty(HTMLElement.prototype, 'scrollHeight', {
    configurable: true,
    get() {
      return mockScrollHeight();
    },
  });

  document.body.scrollHeight = render(
    <ContentAnchor initialWidth={100} initialHeight={100}>
      <Content />
    </ContentAnchor>,
  );

  act(() => {
    // simulate above viewport and resize events
    IOInstance.fireIntersectEvent([
      {
        isIntersecting: false, // is not in view
        boundingClientRect: {
          top: -9999, // is above viewport
          height: initialSize,
          width: initialSize,
        },
      },
    ]);
    ROInstance.fireResizeEvent([
      {
        contentRect: {
          height: initialSize - sizeDecrease, // becomes 100px smaller
          width: initialSize - sizeDecrease, // becomes 100px smaller
        },
      },
    ]);
  });

  expect(global.scrollTo).toHaveBeenCalledWith(expectedXPos, expectedYPos);
  expect(global.pageYOffset).toEqual(
    initialScrollYPosition - pageHeightDecreaseAmount,
  );
});

it('should adjust Y scroll position when above viewport and child content becomes larger', () => {
  const initialScrollYPosition = 1000;
  const expectedXPos = 0;
  const expectedYPos = 1100;
  const initialSize = 200;
  const sizeIncrease = 100;
  const initialPagelHeight = 5000;
  const pageHeightIncreaseAmount = sizeIncrease;

  global.pageYOffset = initialScrollYPosition;

  // simulate the document becoming smaller with each call to document.body.scrollHeight
  const mockScrollHeight = jest
    .fn()
    .mockReturnValueOnce(initialPagelHeight) // 1st call to document.body.scrollHeight
    .mockReturnValueOnce(initialPagelHeight + pageHeightIncreaseAmount); // 2nd call to document.body.scrollHeight

  Object.defineProperty(HTMLElement.prototype, 'scrollHeight', {
    configurable: true,
    get() {
      return mockScrollHeight();
    },
  });

  render(
    <ContentAnchor initialWidth={100} initialHeight={100}>
      <Content />
    </ContentAnchor>,
  );

  act(() => {
    // simulate above viewport and resize events
    IOInstance.fireIntersectEvent([
      {
        isIntersecting: false,
        boundingClientRect: {
          top: -9999, // is above viewport
          height: initialSize,
          width: initialSize,
        },
      },
    ]);
    ROInstance.fireResizeEvent([
      {
        contentRect: {
          height: initialSize + sizeIncrease, // becomes 100px larger
          width: initialSize + sizeIncrease, // becomes 100px larger
        },
      },
    ]);
  });

  expect(global.scrollTo).toHaveBeenCalledWith(expectedXPos, expectedYPos);
  expect(global.pageYOffset).toEqual(
    initialScrollYPosition + pageHeightIncreaseAmount,
  );
});

it('should not adjust scroll position (with js) if CSS scroll anchoring is supported', () => {
  const initialScrollYPosition = 300;
  const initialSize = 100;
  const sizeIncrease = 100;

  global.CSS = {
    supports: () => true, // simulate support for overflow-anchor: auto
  };
  global.pageYOffset = initialScrollYPosition;

  render(
    <ContentAnchor>
      <Content />
    </ContentAnchor>,
  );

  act(() => {
    // simulate above viewport and resize events
    IOInstance.fireIntersectEvent([
      {
        isIntersecting: false, // is not in view
        boundingClientRect: {
          top: -9999, // is above viewport
          height: initialSize,
          width: initialSize,
        },
      },
    ]);
    ROInstance.fireResizeEvent([
      {
        contentRect: {
          height: initialSize + sizeIncrease, // becomes 100px larger
          width: initialSize + sizeIncrease, // becomes 100px larger
        },
      },
    ]);
  });

  expect(global.scrollTo).not.toHaveBeenCalled();
  expect(global.pageYOffset).toEqual(initialScrollYPosition);
});
