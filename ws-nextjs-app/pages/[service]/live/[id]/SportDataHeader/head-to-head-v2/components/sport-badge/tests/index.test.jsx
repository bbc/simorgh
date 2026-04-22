// import React from 'react';
import {
  render,
  screen,
  act,
} from '#app/components/react-testing-library-with-providers';
// import { createSize } from '@bbc/web-gel-foundations';
import SportBadge from '../index';

test('can render a badge for a urn identifier', async () => {
  await act(async () => {
    render(
      <SportBadge
        id="urn:bbc:sportsdata:football:team:liverpool"
        alt="Liverpool FC"
      />,
    );
  });
  const element = screen.getByRole('img');

  expect(element).toBeInTheDocument();
  expect(element).toHaveAttribute('alt', 'Liverpool FC');
  expect(element).toHaveAttribute('data-testid', 'badge-img-liverpool');
});

// please update the below uncommmentedout tests to use await act async screen etc as above
test('can render a badge for a numeric identifier', async () => {
  await act(async () => {
    render(<SportBadge id={58510} />);
  });
  const element = screen.getByRole('presentation', { hidden: true }); // img role does not work here, most likely due to missing alt text

  expect(element).toBeInTheDocument();
  expect(element).toHaveAttribute('data-testid', 'badge-img-58510');
});

test('can render a badge with an empty alt attribute', async () => {
  await act(async () => {
    render(<SportBadge id="urn:bbc:sportsdata:football:team:liverpool" />);
  });
  const element = screen.getByRole('presentation', { hidden: true }); // img role does not work here, most likely due to missing alt text

  expect(element).toHaveAttribute('alt', '');
});

test('can render a placeholder where a mapping does not exist', async () => {
  await act(async () => {
    render(<SportBadge id="invalid-id" />);
  });
  const element = screen.getByRole('presentation', { hidden: true }); // img role does not work here, most likely due to missing alt text

  expect(element).toHaveAttribute('alt', '');
});

test('does not render an image where a mapping does not exist and a placeholder fallback should be not be rendered', async () => {
  await act(async () => {
    render(<SportBadge id="invalid-id" usePlaceholderFallback={false} />);
  });

  expect(screen.queryByRole('img')).not.toBeInTheDocument();
});

test('does not render an image where an id is not provided and a placeholder fallback should not be rendered', async () => {
  await act(async () => {
    render(<SportBadge usePlaceholderFallback={false} />);
  });

  expect(screen.queryByRole('img')).not.toBeInTheDocument();
});

test('sets aria-hidden to true when no alt text given to mitigate screen reader navigation bug', async () => {
  await act(async () => {
    render(<SportBadge />);
  });

  expect(screen.getByRole('presentation', { hidden: true })).toHaveAttribute(
    'aria-hidden',
    'true',
  ); // img role does not work here, most likely due to missing alt text
});

// test('is the correct width when a single size is specified', () => {
//   render(<SportBadge id={1} size={24} />);
//   expect(getComputedStyle(screen.getByTestId('badge-container-1')).width).toBe(
//     createSize(24),
//   );
// });

// test('is the correct width when a range of sizes is specified', () => {
//   const sizeRanges = { small: 24, medium: 32, large: 64 };
//   render(<SportBadge id={1} size={sizeRanges} />);
//   expect(getComputedStyle(screen.getByTestId('badge-container-1')).width).toBe(
//     createSize(24),
//   );
// });
