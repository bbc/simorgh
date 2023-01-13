import React from 'react';
import { render } from '@testing-library/react';
import { PromoSingleBlock, oneLinkWithTimestamp } from '../helpers/fixtureData';
import Promo from '.';

// eslint-disable-next-line react/prop-types
const ScrollablePromo = ({ block }) => (
  <Promo block={block} onClick={() => {}} />
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
});
