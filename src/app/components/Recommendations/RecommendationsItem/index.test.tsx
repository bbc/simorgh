import React from 'react';
import { render } from '#app/components/react-testing-library-with-providers';
import RecommendationsItem from '.';
import recommendationsFixtures from '../fixtures';

describe('RecommendationsItem', () => {
  it('should render a single recommendation with a title and link', () => {
    const { getByText, container } = render(
      <RecommendationsItem recommendation={recommendationsFixtures[0]} />,
    );

    const links = container.querySelectorAll('a');

    expect(getByText(recommendationsFixtures[0].title)).toBeInTheDocument();
    expect(links).toHaveLength(1);
    expect(links[0].getAttribute('href')).toEqual(
      recommendationsFixtures[0].href,
    );
  });

  it('should not render if no recommendation is provided', () => {
    const { container } = render(<RecommendationsItem recommendation={null} />);

    expect(container).toBeEmptyDOMElement();
  });
});
