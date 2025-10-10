import React from 'react';
import { render } from '../../../react-testing-library-with-providers';
import LastUpdated from '.';

describe('MostReadCanonical - LastUpdated', () => {
  it('should render LastUpdated correctly', () => {
    const { container } = render(
      <LastUpdated
        timestamp={864691200}
        prefix="Last Updated:"
        locale="en-gb"
        timezone="Europe/London"
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
