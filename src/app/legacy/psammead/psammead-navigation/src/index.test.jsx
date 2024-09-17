import React from 'react';
import { render } from '#components/react-testing-library-with-providers';
import latin from '#components/ThemeProvider/fontScripts/latin';
import { ScrollableNavigation } from './ScrollableNavigation';
import Navigation, { NavigationUl, NavigationLi } from './index';
import igboNavData from '../testHelpers/igbo';

const navigationUlComponent = (
  <NavigationUl>
    {igboNavData.map((item, index) => {
      const { title, url } = item;
      const active = index === 0;

      return (
        <NavigationLi
          key={title}
          url={url}
          script={latin}
          active={active}
          currentPageText="Current page"
          service="news"
          data-navigation="test_navigation"
        >
          {title}
        </NavigationLi>
      );
    })}
  </NavigationUl>
);

const NavigationExample = (
  <Navigation script={latin} service="news">
    {navigationUlComponent}
  </Navigation>
);

describe('Navigation', () => {
  it('should render correctly', () => {
    const { container } = render(NavigationExample);
    expect(container).toMatchSnapshot();
  });

  it('should render correctly when isOpen is true', () => {
    const { container } = render(
      <Navigation script={latin} service="news" isOpen>
        {navigationUlComponent}
      </Navigation>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render correctly when ampOpenClass prop is provided', () => {
    const { container } = render(
      <Navigation
        script={latin}
        skipLinkText="Wụga n’ọdịnaya"
        service="news"
        ampOpenClass="is-open"
      >
        {navigationUlComponent}
      </Navigation>,
    );
    expect(container).toMatchSnapshot();
  });
});

describe('Scrollable Navigation', () => {
  it('should render correctly', () => {
    const { container } = render(
      <ScrollableNavigation>{NavigationExample}</ScrollableNavigation>,
    );
    expect(container).toMatchSnapshot();
  });
});

describe('Assertions', () => {
  it('should add extra props passed to the NavigationLi link', () => {
    const { container } = render(
      <NavigationLi
        key="test-key"
        url="http://test.url"
        script={latin}
        currentPageText="Current page"
        service="news"
        active
        data-navigation="test_navigation"
      >
        Testing exta props
      </NavigationLi>,
    );
    expect(
      container.querySelector('a').getAttribute('data-navigation'),
    ).toEqual('test_navigation');
  });
});
