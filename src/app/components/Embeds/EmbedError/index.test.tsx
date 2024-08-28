import React from 'react';
import { render } from '#components/react-testing-library-with-providers';
import EmbedError from '.';

describe('EmbedError', () => {
  it('Should show an error message in a Strong element', () => {
    const { container, getByText } = render(
      <EmbedError
        message="Sorry, we can't display this part of the story on this lightweight mobile page."
        link={{
          text: 'View the full version of the page to see all the content.',
          href: 'linktoriddle',
        }}
      />,
    );

    const actualElement = container.querySelector('strong');
    const actualText = getByText(
      "Sorry, we can't display this part of the story on this lightweight mobile page.",
    );

    expect(actualElement).toBeInTheDocument();
    expect(actualText).toBeInTheDocument();
  });

  it('should render an embed error with a link', () => {
    const { container, getByText } = render(
      <EmbedError
        message="Sorry, we can't display this part of the story on this lightweight mobile page."
        link={{
          text: 'View the full version of the page to see all the content.',
          href: 'linktoriddle',
        }}
      />,
    );

    const actualElement = container.querySelector('a[href="linktoriddle"');
    const actualText = getByText(
      'View the full version of the page to see all the content.',
    );

    expect(actualElement).toBeInTheDocument();
    expect(actualText).toBeInTheDocument();
  });
});
