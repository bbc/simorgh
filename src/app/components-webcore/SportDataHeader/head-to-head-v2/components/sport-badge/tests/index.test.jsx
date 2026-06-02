// import React from 'react';
import {
  render,
  screen,
  act,
} from '#app/components/react-testing-library-with-providers';
import SportBadge from '../index';

test('can render a badge for a urn identifier', async () => {
  await act(async () => {
    render(
      <SportBadge
        urn="urn:bbc:sportsdata:football:team:liverpool"
        alt="Liverpool FC"
        src="ichefImage"
      />,
    );
  });
  const element = screen.getByRole('img');

  expect(element).toBeInTheDocument();
  expect(element).toHaveAttribute('alt', 'Liverpool FC');
  expect(element).toHaveAttribute('data-testid', 'badge-img-liverpool');
});

test('can render a badge with an empty alt attribute', async () => {
  await act(async () => {
    render(
      <SportBadge
        urn="urn:bbc:sportsdata:football:team:liverpool"
        src="ichefImage"
      />,
    );
  });
  const element = screen.getByRole('presentation', { hidden: true }); // img role does not work here, most likely due to missing alt text

  expect(element).toHaveAttribute('alt', '');
});

test('does not render an image for an invalid src', async () => {
  await act(async () => {
    render(<SportBadge id="invalid-id" src={null} />);
  });

  expect(screen.queryByRole('img')).not.toBeInTheDocument();
});

test('does not render an image where an id is not provided and a placeholder fallback should not be rendered', async () => {
  await act(async () => {
    render(<SportBadge />);
  });

  expect(screen.queryByRole('img')).not.toBeInTheDocument();
});

test('sets aria-hidden to true when no alt text given to mitigate screen reader navigation bug', async () => {
  await act(async () => {
    render(
      <SportBadge
        urn="urn:bbc:sportsdata:football:team:liverpool"
        src="ichefImage"
      />,
    );
  });

  expect(screen.getByRole('presentation', { hidden: true })).toHaveAttribute(
    'aria-hidden',
    'true',
  );
});
