import React from 'react';
import { render } from '#components/react-testing-library-with-providers';
import latin from '#components/ThemeProvider/fontScripts/latin';
import LastUpdated from '.';

describe('MostReadCanonical - LastUpdated', () => {
  it('should render LastUpdated correctly', () => {
    const { container } = render(
      <LastUpdated
        timestamp={864691200}
        prefix="Last Updated:"
        script={latin}
        service="news"
        locale="en-gb"
        timezone="Europe/London"
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
