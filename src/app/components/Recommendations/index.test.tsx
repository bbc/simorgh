import React from 'react';
import { render } from '#app/components/react-testing-library-with-providers';
import Recommendations from '.';
import recommendationsFixtures from './fixtures';

describe('Recommendations', () => {
  it('should render a single recommendation', () => {
    const { getByText } = render(
      <Recommendations data={recommendationsFixtures} />,
      { service: 'pidgin', toggles: { mostRead: { enabled: true } } },
    );
    const title = getByText(recommendationsFixtures[0].title);
    expect(title).toBeInTheDocument();
  });

  it('should render multiple recommendations', () => {
    const { getByText } = render(
      <Recommendations data={recommendationsFixtures} />,
      { service: 'pidgin', toggles: { mostRead: { enabled: true } } },
    );

    const listEl = document.querySelector('ul');
    expect(listEl).toBeInTheDocument();

    recommendationsFixtures.forEach(({ title }) => {
      const recommendationTitle = getByText(title);
      expect(recommendationTitle).toBeInTheDocument();
    });
  });

  it('should not render recommendations when toggle is disabled', () => {
    render(<Recommendations data={recommendationsFixtures} />, {
      service: 'pidgin',
      toggles: { mostRead: { enabled: false } },
    });

    const listEl = document.querySelector('ul');
    expect(listEl).not.toBeInTheDocument();
  });

  it('should not render recommendations for a service that has Most Read disabled', () => {
    render(<Recommendations data={recommendationsFixtures} />, {
      service: 'cymrufyw',
    });

    const listEl = document.querySelector('ul');
    expect(listEl).not.toBeInTheDocument();
  });
});
