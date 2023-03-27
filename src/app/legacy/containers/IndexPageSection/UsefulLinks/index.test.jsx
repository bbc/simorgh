import React from 'react';
import { render } from '../../../../components/react-testing-library-with-providers';
import latin from '../../../../components/ThemeProvider/fontScripts/latin';
import usefulItems from './usefulItems';
import UsefulLinksComponent from '.';

describe('Useful links', () => {
  it('should render multiple correctly', () => {
    const { container } = render(
      <UsefulLinksComponent
        items={usefulItems}
        script={latin}
        service="news"
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render one correctly', () => {
    const { container } = render(
      <UsefulLinksComponent
        items={[usefulItems[0]]}
        script={latin}
        service="news"
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
